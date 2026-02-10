import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormacionState } from '../../../../models/formacion-state';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class FormacionStoreService {
  private stateSubject = new BehaviorSubject<FormacionState>({
    loading: false,
    error: null,
    formaciones: [],
    currentIndex: 0
  });

  state$ = this.stateSubject.asObservable();

  constructor(private dataService: DataService) {}

  loadFormacion(usuarioId: number): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true });
    this.dataService.getFormacion(usuarioId).subscribe({
      next: data => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          formaciones: data
        });
      },
      error: err => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          error: 'Error al cargar formación académica'
        });
      }
    });
  }
  nextFormacion(): void {
  const { currentIndex, formaciones } = this.stateSubject.value;
  if (formaciones.length > 0) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      currentIndex: (currentIndex + 1) % formaciones.length
    });
  }
}


}