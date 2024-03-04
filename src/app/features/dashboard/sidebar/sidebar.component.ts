import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  
  @Output() optionSelected = new EventEmitter<string>();

  constructor(private accountService: AccountService, private router:Router){}

  selectType() {
    this.optionSelected.emit('type');
  }

  selectColor() {
    this.optionSelected.emit('color');
  }

  selectBrand() {
    this.optionSelected.emit('brand');
  }

  selectModel() {
    this.optionSelected.emit('model');
  }

  loggout(){
    this.accountService.currentUserSig.set(null);
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/');
  }
}