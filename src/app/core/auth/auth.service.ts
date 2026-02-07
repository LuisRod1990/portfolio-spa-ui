import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.authApi}${environment.endpoints.login}`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  login(credentials: { username: string; password: string }): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(this.apiUrl, credentials);
  }

  refreshToken(refreshToken: string): Observable<{ accessToken: string; refreshToken: string }> {
    const url = `${environment.authApi}${environment.endpoints.refresh}`;
    return this.http.post<{ accessToken: string; refreshToken: string }>(url, { refreshToken });
  }
}