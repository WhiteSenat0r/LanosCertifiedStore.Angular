import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error)
        {
          console.log(error);
          if(error.status === 403){
            this.toastr.error('403', 'Проблема з авторизацією');
          };
          if(error.status === 404){
            this.router.navigateByUrl('/not-found');
          };
          if(error.status === 405){
            this.toastr.error(error.message, error.status.toString());
          };
          if(error.status === 500)
          {
            this.toastr.error(error.message, error.status.toString());
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
