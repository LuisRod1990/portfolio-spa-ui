import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorage.getAccessToken();

    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenStorage.getRefreshToken();
      if (refreshToken) {
        // Intentar refresh
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap(tokens => {
            this.isRefreshing = false;
            this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
            this.refreshTokenSubject.next(tokens.accessToken);
            return next.handle(
              req.clone({ setHeaders: { Authorization: `Bearer ${tokens.accessToken}` } })
            );
          }),
          catchError(err => {
            // Si el refresh falla con 401 → login automático
            this.isRefreshing = false;
            this.tokenStorage.clear();
            console.warn('Refresh falló con 401, intentando login automático...');

            return this.authService.login({
              username: environment.auth.username,
              password: environment.auth.password
            }).pipe(
              switchMap(tokens => {
                this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
                this.refreshTokenSubject.next(tokens.accessToken);
                return next.handle(
                  req.clone({ setHeaders: { Authorization: `Bearer ${tokens.accessToken}` } })
                );
              }),
              catchError(loginErr => {
                console.error('Login automático falló:', loginErr);
                return throwError(() => loginErr);
              })
            );
          })
        );
      }
    }

    // Si ya hay un refresh en curso, esperar a que se complete
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token =>
        next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      )
    );
  }
}