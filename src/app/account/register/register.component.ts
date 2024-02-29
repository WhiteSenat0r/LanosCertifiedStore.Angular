import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  accountService = inject(AccountService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post<{ user: User }>('https://api.realworld.io/api/users', {
      user: this.form.getRawValue(),
    }).subscribe( {
      next: (response:any) => {
        localStorage.setItem('token',  response.user.token);
        this.accountService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      },
      error: error => console.error(error),
    });
  }
 
}
