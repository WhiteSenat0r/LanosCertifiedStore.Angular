import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly toastr = inject(ToastrService);
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // console.log('[AuthInterceptor]', request.method, request.url, '→ token:', token);

    if (token) {
      const authRequest = this.addAuthorizationHeader(request, token);
      return next.handle(authRequest);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Покажемо повідомлення
          this.toastr.error(
            'Ви не авторизувалися',
            'Помилка'
          );

          // ❗ Погашаємо помилку, щоб вона не пішла в компонент
          return EMPTY;
        }

        // Для інших помилок — проброс
        return throwError(() => error);
      })
    );
  }

  /**
   * Add Authorization header with Bearer token
   */
  private addAuthorizationHeader(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
