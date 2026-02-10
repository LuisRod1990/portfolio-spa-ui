import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogService {
  private apiUrl = `${environment.authApi}/logs`; // endpoint de tu API para guardar logs

  constructor(private http: HttpClient) {}

  logError(message: string, stack?: string): void {
    const payload = {
      logLevel: 'ERROR',
      logger: 'AngularApp',
      message,
      exception: stack || null
    };
    this.http.post(this.apiUrl, payload).subscribe({
      error: err => console.error('Error al enviar log al backend', err)
    });
  }

  logInfo(message: string): void {
    const payload = {
      logLevel: 'INFO',
      logger: 'AngularApp',
      message
    };
    this.http.post(this.apiUrl, payload).subscribe();
  }
}