import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'kolesko-icon',
  standalone: true,
  template: `
    <div [ngClass]="innerClass" [innerHTML]="svgContent"></div>
  `,
  imports: [CommonModule]
})
export class SvgIconDisplayComponent implements OnInit, OnChanges {
  @Input() name: string = 'outline-chevron-right';
  @Input() src?: string;
  @Input() size?: number;
  @Input() width?: number;
  @Input() height?: number;
  @Input() stroke: boolean = false;
  // For getting whole spectrum of abalitites to be available. 
  @Input() innerClass: string = ''; 

  svgContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      this.loadAndModifySvg();
    }
  }

  ngOnInit(): void {
    this.loadAndModifySvg();
  }

  private loadAndModifySvg(): void {
    let iconFilePath: string;
    this.src ? (iconFilePath = this.src) : iconFilePath = `assets/icons/others/${this.name}.svg`;
    this.http.get(iconFilePath, { responseType: 'text' }).subscribe({
      next: svg => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.modifySvg(svg));
      },
      error: error => {
        console.error(`Error loading icon:`, error);
      }
    });
  }

  private modifySvg(svg: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svg;

    const svgElement = tempDiv.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('fill', 'currentColor'); // Робимо SVG заповненим currentColor

      // Застосовуємо currentColor до всіх елементів, які мають fill або stroke
      const elementsToColor = svgElement.querySelectorAll('path, circle, rect, polygon, ellipse, line, polyline');
      // 
      elementsToColor.forEach(element => {
        // Якщо атрибут stroke існує, змінюємо його на currentColor
        if (element.hasAttribute('stroke') && this.stroke) {
          element.setAttribute('stroke', 'currentColor');
        }
        element.setAttribute('fill', 'currentColor');
      });

      // Задаємо розміри SVG, якщо вони вказані
      if (this.size !== undefined) {
        svgElement.setAttribute('width', `${this.size}`);
        svgElement.setAttribute('height', `${this.size}`);
      } else {
        if (this.width !== undefined) {
          svgElement.setAttribute('width', `${this.width}`);
        }
        if (this.height !== undefined) {
          svgElement.setAttribute('height', `${this.height}`);
        }
      }
    }

    return tempDiv.innerHTML;
  }
}