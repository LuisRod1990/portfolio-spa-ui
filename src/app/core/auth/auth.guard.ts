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

  private logTokenStatus(token: string | null, issuedAt: number | null, refreshToken?: string) {
    //console.log('--- Estado del Token ---');
    //console.log({      token,      issuedAt,      now: Date.now(),      ttl: this.TOKEN_TTL,      expired: issuedAt ? Date.now() - issuedAt >= this.TOKEN_TTL : null,      refreshToken    });    
    //console.log('------------------------');
  }

  canActivate(): Observable<boolean> {
    const token = this.tokenStorage.getAccessToken();
    const issuedAt = this.tokenStorage.getIssuedAt();

    // Caso 1: Token válido en localStorage
    if (token && issuedAt && Date.now() - issuedAt < this.TOKEN_TTL) {
      //console.log('✅ Token válido encontrado en localStorage');
      this.logTokenStatus(token, issuedAt);
      return of(true);
    }

    // Caso 2: Token expirado → intenta refresh
    if (token && issuedAt && Date.now() - issuedAt >= this.TOKEN_TTL) {
      const refreshToken = this.tokenStorage.getRefreshToken();
      if (refreshToken) {
        console.warn('⚠️ Token expirado, intentando refresh...');
        this.logTokenStatus(token, issuedAt, refreshToken);
        return this.authService.refreshToken(refreshToken).pipe(
          map(tokens => {
            //console.log('🔄 Refresh exitoso, guardando nuevos tokens');
            this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
            return true;
          }),
          catchError(err => {
            console.error('❌ Error al refrescar token:', err);
            this.tokenStorage.clear();
            return of(false);
          })
        );
      } else {
        console.error('❌ Token expirado y no hay refreshToken disponible');
        this.tokenStorage.clear();
        return of(false);
      }
    }

    // Caso 3: No hay token → login automático
    console.warn('⚠️ No se encontró token, intentando login automático...');
    return this.authService.login({
      username: environment.auth.username,
      password: environment.auth.password
    }).pipe(
      map(tokens => {
        //console.log('✅ Login automático exitoso, guardando tokens');
        this.tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);
        return true;
      }),
      catchError(err => {
        //console.error('❌ Error en login automático:', err);
        return of(false);
      })
    );
  }
}