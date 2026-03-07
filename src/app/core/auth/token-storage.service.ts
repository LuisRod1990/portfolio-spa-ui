import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private TOKEN_KEY = 'auth';

  // Subject para emitir cambios de token en tiempo real
  private tokenSubject = new BehaviorSubject<string | null>(this.getAccessToken());
  token$ = this.tokenSubject.asObservable();

  getAccessToken(): string | null {
    const auth = localStorage.getItem(this.TOKEN_KEY);
    return auth ? JSON.parse(auth).accessToken : null;
  }

  getRefreshToken(): string | null {
    const auth = localStorage.getItem(this.TOKEN_KEY);
    return auth ? JSON.parse(auth).refreshToken : null;
  }

  getIssuedAt(): number | null {
    const auth = localStorage.getItem(this.TOKEN_KEY);
    return auth ? JSON.parse(auth).issuedAt : null;
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(
      this.TOKEN_KEY,
      JSON.stringify({
        accessToken,
        refreshToken,
        issuedAt: Date.now() // ⏱ guardamos el momento en que se generó
      })
    );

    // Emitimos el nuevo token para que otros servicios lo detecten
    this.tokenSubject.next(accessToken);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('issuedAt');
    this.tokenSubject.next(null);
  }
}