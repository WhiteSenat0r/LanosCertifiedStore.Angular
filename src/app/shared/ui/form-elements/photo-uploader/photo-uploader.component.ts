import {
  AfterViewInit,
  Component,
  computed,
  HostListener,
  input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  TouchedChangeEvent,
} from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { IconOutlineUploadComponent } from '../../../icons/icon-outline-upload/icon-outline-upload.component';
import { IconOutlineTrashComponent } from '../../../icons/icon-outline-trash/icon-outline-trash.component';

@Component({
  selector: 'app-photo-uploader',
  standalone: true,
  imports: [IconOutlineUploadComponent, IconOutlineTrashComponent],
  templateUrl: './photo-uploader.component.html',
  styleUrl: './photo-uploader.component.css',
})
export class PhotoUploaderComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  ngOnInit() {
    this.updateScreenSize();
  }
  // CVA-підключення
  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  //Inputs
  label = input<string>();

  // Signals and Observables
  files = signal<File[]>([]);
  showError = signal(false);
  controlErrors = signal<Record<string, any> | null>(null);
  isScreenXsOrLarger = signal(false);

  private readonly destroy$ = new Subject<void>();

  //Computed
  readonly errorMessage = computed(() => {
    const errors = this.controlErrors();
    if (!errors) return '';

    if (errors['minFiles']) {
      return `Мінімальна кількість фотографій: ${errors['minFiles'].required}, зараз: ${errors['minFiles'].actual}`;
    }

    if (errors['maxFiles']) {
      return `Ліміт фотографій перевищено на ${
        errors['maxFiles'].actual - errors['maxFiles'].required
      }`;
    }

    return '';
  });

  readonly slots = computed(() => {
    const errors = this.controlErrors();
    const max = errors?.['maxFiles']?.required ?? 5;

    return Array.from({ length: max }, (_, i) => ({ id: `slot-${i}` }));
  });

  readonly addableSlots = computed(() => {
    const errors = this.controlErrors();
    const max = errors?.['maxFiles']?.required ?? 5;
    const addableSlotsLength: number = max - this.files().length;

    const slots = this.slots();
    return slots.slice(slots.length - addableSlotsLength);
  });

  //Methods
  //Events methods
  openFileInput(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const parentDiv = button.parentElement;
    if (!parentDiv) return;

    const input = parentDiv.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;
    if (input) {
      input.click();
    }
  }

  onFileSelected(e: Event, index?: number) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Ігноруємо індекс, просто додаємо всі вибрані файли
      this.addFiles(Array.from(input.files));
      input.value = '';
      this.onTouched();
    }
  }

  isDraggingOver = signal(false);

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDraggingOver.set(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      this.addFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
      this.onTouched();
    }
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDraggingOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDraggingOver.set(false);
  }

  private fileUrls = new Map<File, string>();
  getFileUrl(file: File): string {
    if (!this.fileUrls.has(file)) {
      this.fileUrls.set(file, URL.createObjectURL(file));
    }
    return this.fileUrls.get(file)!;
  }

  removeFile(index: number) {
    const updated = [...this.files()];
    const [removedFile] = updated.splice(index, 1);

    const url = this.fileUrls.get(removedFile);
    if (url) {
      URL.revokeObjectURL(url);
      this.fileUrls.delete(removedFile);
    }

    this.files.set(updated);
    this.onChange(updated);
  }

  // CVA methods
  onChange: (value: File[] | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(files: File[] | null): void {
    if (files) {
      this.files.set(files);
    } else {
      this.files.set([]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.initControl());
  }

  //Utils
  private addFiles(newFiles: File[]) {
    const updatedFiles = [...this.files(), ...newFiles];
    this.files.set(updatedFiles);
    this.onChange(updatedFiles);
  }

  private initControl() {
    const control = this.ngControl?.control;
    if (!control) return;

    control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const isErrorVisible = control.invalid && control.touched;
      this.showError.set(isErrorVisible);
      this.controlErrors.set(control.errors);
    });

    control.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is TouchedChangeEvent => e instanceof TouchedChangeEvent)
      )
      .subscribe(() => {
        const isErrorVisible = control.invalid && control.touched;
        this.showError.set(isErrorVisible);
        this.controlErrors.set(control.errors);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScreenSize();
  }
  private updateScreenSize() {
    this.isScreenXsOrLarger.set(window.innerWidth >= 640);
  }

  //Draggable logic
  draggedIndex = signal<number | null>(null);
  hoveredIndex = signal<number | null>(null);

  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex.set(index);

    const dragElement = event.currentTarget as HTMLElement;
    const ghost = dragElement.cloneNode(true) as HTMLElement;
    ghost.classList.add('ghost-image');
    document.body.appendChild(ghost);

    event.dataTransfer!.setDragImage(ghost, event.offsetX, event.offsetY);

    // прибрати ghost після завершення drag
    dragElement.addEventListener(
      'dragend',
      () => {
        ghost.remove();
      },
      { once: true }
    );
    //Allegedly for some browsers, so drop could work
    //event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOverReorder(event: DragEvent, index: number) {
    event.preventDefault();
    this.hoveredIndex.set(index);
  }

  onDropReorder(event: DragEvent, index: number) {
    event.preventDefault();
    const draggedIndexValue = this.draggedIndex();
    if (draggedIndexValue === null) return;

    const filesCopy = [...this.files()];
    const draggedFile = filesCopy[draggedIndexValue];

    filesCopy.splice(draggedIndexValue, 1);
    filesCopy.splice(index, 0, draggedFile);

    this.updateFiles(filesCopy);
    this.draggedIndex.set(null);
    this.hoveredIndex.set(null);
  }

  onDragEnd(event: DragEvent) {
    this.draggedIndex.set(null);
    this.hoveredIndex.set(null);
  }

  updateFiles(newFiles: File[]) {
    this.files.set(newFiles);
    this.onChange(newFiles);
  }
}
