import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
        @if (!errorMessage() && !isCompleted()) {
          <div class="mb-6">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Обробка авторизації</h2>
          <p class="text-gray-600">Зачекайте, йде перевірка даних...</p>
        }

        @if (errorMessage()) {
          <div class="mb-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-xl font-semibold text-red-600 mb-2">Помилка авторизації</h2>
          <p class="text-gray-600 mb-4">{{ errorMessage() }}</p>
          <button 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            (click)="tryAgain()">
            Спробувати знову
          </button>
        }

        @if (isCompleted() && !errorMessage()) {
          <div class="mb-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-xl font-semibold text-green-600 mb-2">Авторизація успішна!</h2>
          <p class="text-gray-600">Перенаправлення...</p>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  errorMessage = signal<string>('');
  isCompleted = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('AuthCallbackComponent: Initialized');
    
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      console.log('AuthCallbackComponent: Query params received:', params);
      
      const code = params['code'];
      const state = params['state'];
      const error = params['error'];
      const errorDescription = params['error_description'];

      if (error) {
        console.error('AuthCallbackComponent: OAuth error received:', error, errorDescription);
        const errorMsg = errorDescription || error;
        this.errorMessage.set(`Помилка авторизації: ${errorMsg}`);
        return;
      }

      if (code) {
        console.log('AuthCallbackComponent: Authorization code received, processing...');
        this.handleAuthCallback(code, state || '');
      } else {
        console.error('AuthCallbackComponent: No authorization code received');
        this.errorMessage.set('Відсутні необхідні параметри авторизації');
      }
    });
  }

  private handleAuthCallback(code: string, state: string) {
    console.log('AuthCallbackComponent: Handling auth callback with code:', code, 'and state:', state);
    
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.authService.handleAuthCallback(code, state).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading.set(false);
        console.log('AuthCallbackComponent: Auth callback processing completed');
      })
    ).subscribe({
      next: (success) => {
        console.log('AuthCallbackComponent: Auth callback result:', success);
        
        if (success) {
          console.log('AuthCallbackComponent: Authentication successful');
          this.isCompleted.set(true);

          setTimeout(() => {
            const returnUrl = localStorage.getItem('returnUrl') || '/';
            localStorage.removeItem('returnUrl');
            
            console.log('AuthCallbackComponent: Redirecting to:', returnUrl);
            this.router.navigate([returnUrl]);
          }, 1500);
        } else {
          console.error('AuthCallbackComponent: Authentication failed');
          this.errorMessage.set('Не вдалося завершити авторизацію');
        }
      },
      error: (error) => {
        console.error('AuthCallbackComponent: Auth callback subscription error:', error);
        
        let errorMsg = 'Помилка під час авторизації';
        if (error?.message) {
          errorMsg = error.message;
        }

        console.log('AuthCallbackComponent: Setting error message:', errorMsg);
        this.errorMessage.set(errorMsg);
      }
    });
  }

  tryAgain() {
    console.log('AuthCallbackComponent: Retrying authentication');
    this.errorMessage.set('');
    this.isCompleted.set(false);
    this.authService.login();
  }

  ngOnDestroy() {
    console.log('AuthCallbackComponent: Destroying');
    this.destroy$.next();
    this.destroy$.complete();
  }
}