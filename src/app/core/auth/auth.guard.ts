import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private TOKEN_TTL = 5 * 60 * 1000; // 5 minutos

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    const token = this.tokenStorage.getAccessToken();
    const issuedAt = this.tokenStorage.getIssuedAt();

    // Caso 1: Token válido en localStorage
    if (token && issuedAt && Date.now() - issuedAt < this.TOKEN_TTL) {
      //console.log('Token válido encontrado en localStorage');
      return of(true);
    }

    // Caso 2: Token expirado → intenta refresh
    if (token && issuedAt && Date.now() - issuedAt >= this.TOKEN_TTL) {
      const refreshToken = this.tokenStorage.getRefreshToken();
      if (refreshToken) {
        //console.log('Token expirado, intentando refresh...');
        return this.authService.refreshToken(refreshToken).pipe(
          map(tokens => {
            this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
            return true;
          }),
          catchError(err => {
            console.error('Error al refrescar token:', err);
            this.tokenStorage.clear();
            return of(false);
          })
        );
      } else {
        this.tokenStorage.clear();
        return of(false);
      }
    }

    // Caso 3: No hay token → login automático
    console.warn('No se encontró token, intentando login automático...');
    return this.authService.login({
      username: environment.auth.username,
      password: environment.auth.password
    }).pipe(
      map(tokens => {
        this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
        return true;
      }),
      catchError(err => {
        console.error('Error en login automático:', err);
        return of(false);
      })
    );
  }
}