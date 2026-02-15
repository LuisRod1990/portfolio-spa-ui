import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Skill } from '../models/skills';
import { Aptitud } from '../models/aptitud';
import { Experiencia } from '../models/experiencia-total';
import { ExperienciaLaboral } from '../models/experiencia-laboral';
import { Formacion } from '../models/formacion';
import { Proyecto } from '../models/proyecto';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getContacto(id: number): Observable<any> {
    const body = { sp: environment.endpoints.getContacto, usuarioId: id };
    console.log('DataService → preparando POST getContacto con body:', body);

    return this.http.post<any>(environment.dataApi, body).pipe(
      tap(response => {
        console.log('DataService → respuesta cruda de la API:', response);
        if (!response) {
          console.warn('DataService → la respuesta vino vacía');
        }
      }),
      catchError(err => {
        console.error('DataService → error al llamar a la API getContacto');
        console.error('Status:', err.status);
        console.error('StatusText:', err.statusText);
        console.error('Message:', err.message);
        console.error('Error completo:', err);
        return throwError(() => err);
      })
    );
  }


  getAptitudes(id: number): Observable<Aptitud[]> {
    const body = { sp: environment.endpoints.getAptitudes, usuarioId: id };
    console.log('POST getAptitudes con body:', body);
    return this.http.post<Aptitud[]>(environment.dataApi, body);
  }

  getSkills(id: number): Observable<Skill[]> {
    const body = { sp: environment.endpoints.getSkills, usuarioId: id };
    console.log('POST getSkills con body:', body);
    return this.http.post<Skill[]>(environment.dataApi, body);
  }

  getExperiencias(id: number): Observable<Experiencia[]> {
    const body = { sp: environment.endpoints.getTotalExperiencia, usuarioId: id };
    console.log('POST getExperiencias con body:', body);
    return this.http.post<Experiencia[]>(environment.dataApi, body);
  }

  getExperienciaLaboral(id: number): Observable<ExperienciaLaboral[]> {
    const body = { sp: environment.endpoints.getExperiencia, usuarioId: id };
    console.log('POST getExperienciaLaboral con body:', body);
    return this.http.post<ExperienciaLaboral[]>(environment.dataApi, body);
  }

   getFormacion(id: number): Observable<Formacion[]> {
     const body = { sp: environment.endpoints.getFormacion, usuarioId: id };
     console.log('POST getFormacion con body:', body);
     return this.http.post<Formacion[]>(environment.dataApi, body);
   }
   getProyectos(id: number): Observable<Proyecto[]> {
     const body = { sp: environment.endpoints.getProyectosPersonales, usuarioId: id };
     console.log('POST getProyecto con body:', body);
     return this.http.post<Proyecto[]>(environment.dataApi, body);
   }
}