import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from '../../services/log'
;import { NotificationService } from '../../services/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private logService: LogService,
    private notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Enviar log al backend
        this.logService.logError(
          `Error en petición ${req.url}`,
          error.message || JSON.stringify(error.error)
        );

        // Mostrar alerta en el móvil
        this.notificationService.showError(`Error: ${error.message}`);

        return throwError(() => error);
      })
    );
  }
}