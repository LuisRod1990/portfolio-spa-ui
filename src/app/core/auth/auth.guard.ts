import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private TOKEN_TTL = 5 * 60 * 1000; // 5 minutos
  error: string | null = null;
  loading = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  private logTokenStatus(token: string | null, issuedAt: number | null) {
    // Logs opcionales para depuración
    // console.log({ token, issuedAt, now: Date.now(), ttl: this.TOKEN_TTL });
  }

  canActivate(): Observable<boolean> {
    const token = this.tokenStorage.getAccessToken();
    const issuedAt = this.tokenStorage.getIssuedAt();

    // Caso 1: Token válido en localStorage
    if (token && issuedAt && Date.now() - issuedAt < this.TOKEN_TTL) {
      this.logTokenStatus(token, issuedAt);
      return of(true);
    }

    // Caso 2: Token expirado → login automático en lugar de refresh
    if (token && issuedAt && Date.now() - issuedAt >= this.TOKEN_TTL) {
      this.tokenStorage.clear();
      console.warn('--> Token expirado, intentando login automático <--');
      this.logTokenStatus(token, issuedAt);
      
      return this.authService.login({
        username: environment.auth.username,
        password: environment.auth.password
      }).pipe(
        map(tokens => {
          console.log('✅ Login automático exitoso, guardando tokens');
          this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
          this.router.navigate(['/']); // redirige al home
          return true;
        }),
        catchError(err => {
          if (err.status === 401) {
            console.error('Login rechazado (401). Credenciales inválidas o borradas en servidor.');
            this.tokenStorage.clear();
          } else {
            console.error('Error en login automático:', err);
          }
          this.error = 'Credenciales inválidas o error en el servidor.';
          return of(false);
        })
      );
    }

    // Caso 3: No hay token → login automático
    console.warn('⚠️ No se encontró token, intentando login automático...');
    return this.authService.login({
      username: environment.auth.username,
      password: environment.auth.password
    }).pipe(
      map(tokens => {
        console.log('✅ Login automático exitoso, guardando tokens');
        this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
        return true;
      }),
      catchError(err => {
        if (err.status === 401) {
          console.error('Login rechazado (401). Credenciales inválidas o borradas en servidor.');
          this.tokenStorage.clear();
        } else {
          console.error('Error en login automático:', err);
        }
        return of(false);
      })
    );
  }
}