import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Skill } from '../models/skills';
import { Aptitud } from '../models/aptitud';
import { Experiencia } from '../models/experiencia-total';
import { ExperienciaLaboral } from '../models/experiencia-laboral';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getContacto(id: number): Observable<any> {
    return this.http.get(`${environment.dataApi}${environment.endpoints.getContacto}/${id}`)
  }

  getAptitudes(id: number): Observable<Aptitud[]> {
    return this.http.get<Aptitud[]>(`${environment.dataApi}${environment.endpoints.getAptitudes}/${id}`)
  }

  getSkills(id: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${environment.dataApi}${environment.endpoints.getSkills}/${id}`)
  }
  getExperiencias(id: number): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${environment.dataApi}${environment.endpoints.getTotalExperiencia}/${id}`)
  }

  getExperienciaLaboral(id: number): Observable<ExperienciaLaboral[]> {
    return this.http.get<ExperienciaLaboral[]>(`${environment.dataApi}${environment.endpoints.getExperiencia}/${id}`)
  }

  /*
  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dataApi}${environment.endpoints.getProyectos}`);
  }
    */

  // ... demás endpoints
}