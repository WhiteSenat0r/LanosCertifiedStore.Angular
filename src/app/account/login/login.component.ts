import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  accountService = inject(AccountService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void{
    this.http.post<{ user: User }>('https://api.realworld.io/api/users/login', {
      user: this.form.getRawValue(),
    }).subscribe((response) => {
      localStorage.setItem('token', response.user.token);
      this.accountService.currentUserSig.set(response.user);
      this.router.navigateByUrl('/');
    });
  }
}
