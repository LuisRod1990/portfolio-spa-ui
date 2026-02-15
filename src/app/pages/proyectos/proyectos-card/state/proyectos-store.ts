import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Proyecto } from '../../../../models/proyecto';
import { ProyectoState } from '../../../../models/proyecto-state';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class ProyectosStoreService {
  private stateSubject = new BehaviorSubject<ProyectoState>({
    loading: false,
    error: null,
    proyectos: [],
    selectedProyecto: null
  });

  state$ = this.stateSubject.asObservable();

  constructor(private dataService: DataService) {}

  loadProyectos(): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true });
    this.dataService.getProyectos(1).subscribe({
      next: (data: Proyecto[]) => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          proyectos: data
        });
      },
      error: () => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          error: 'Error al cargar proyectos'
        });
      }
    });
  }

  selectProyecto(proyecto: Proyecto): void {
    this.stateSubject.next({ ...this.stateSubject.value, selectedProyecto: proyecto });
  }

  closeProyecto(): void {
    this.stateSubject.next({ ...this.stateSubject.value, selectedProyecto: null });
  }
}