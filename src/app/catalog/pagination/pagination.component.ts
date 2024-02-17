import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent{
  optionsArr: number[] = [10,20,30,50];
  
  @Input() itemsPerPage: number = 0;
  @Input() totalCountItems: number = 0;
  @Input() pageNumber: number = 0;

  @Output() pageNumberChange: EventEmitter<any | null> = new EventEmitter<any | null>();
  @Output() pageSizeChange: EventEmitter<any | null> = new EventEmitter<any | null>();

  onPageChanged(event: any)
  {
     if(this.pageNumber !== event.page)
     {
       this.pageNumber = event.page;
     }

     this.pageNumberChange.emit(this.pageNumber);
     
    window.scrollTo(0, 0);
  }

  onOptionSelected(event: any)
  {
    if(event.target.value)
    {
      this.pageSizeChange.emit(event.target.value);
    }
    
    window.scrollTo(0, 0);
  }
}
