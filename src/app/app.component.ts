import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AccountService } from './account/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  
  constructor(private http: HttpClient){}

  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
