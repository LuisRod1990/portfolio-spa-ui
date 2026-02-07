import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private TOKEN_TTL = 5 * 60 * 1000; // ⏱ 5 minutos

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const token = this.tokenStorage.getAccessToken();
    const issuedAt = this.tokenStorage.getIssuedAt();

    // Caso 1: No hay token → login automático contra la API
    if (!token) {
      console.warn('No se encontró token, intentando login automático...');
      return this.authService.login({
        username: environment.auth.username,
        password: environment.auth.password
      }).pipe(
        timeout(15000),
        map(tokens => {
          console.log('Login exitoso, tokens recibidos de la API');
          this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
          return true; // ✅ deja pasar
        }),
        catchError(err => {
          console.error('Login API falló o tardó demasiado:', err);
          this.router.navigate(['/login']); // 🔹 fallback al login manual
          return of(false);
        })
      );
    }

    // Caso 2: Token expirado → intenta refresh automático
    if (issuedAt && Date.now() - issuedAt > this.TOKEN_TTL) {
      const refreshToken = this.tokenStorage.getRefreshToken();

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          timeout(5000),
          map(tokens => {
            this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
            return true;
          }),
          catchError(err => {
            this.tokenStorage.clear();
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      } else {
        this.tokenStorage.clear();
        this.router.navigate(['/login']);
        return of(false);
      }
    }

    // Caso 3: Token válido → acceso permitido
    console.log('Token válido, acceso permitido');
    return of(true);
  }
}