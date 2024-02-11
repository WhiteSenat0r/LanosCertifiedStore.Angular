import { Component } from '@angular/core';
import {Type} from "../shared/models/type";
import {Brand} from "../shared/models/brand";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  showDropdown: boolean = false;



  toggleDropdown() {
    this.showDropdown = !this.showDropdown
  }
}
