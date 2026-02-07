import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExperienciaState } from '../../../../models/experiencia-state';
import { ExperienciaLaboral } from '../../../../models/experiencia-laboral';
import { EmpresaGroup } from '../../../../models/empresa-group';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class ExperienciaStoreService {
  private stateSubject = new BehaviorSubject<ExperienciaState>({
    loading: false,
    error: null,
    experiencias: [],
    empresasAgrupadas: []
  });

  state$ = this.stateSubject.asObservable();

  constructor(private dataService: DataService) {}

  loadExperiencias(): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true, error: null });

    this.dataService.getExperienciaLaboral(1).subscribe({
      next: (data: ExperienciaLaboral[]) => {
        const empresasAgrupadas = this.groupByEmpresa(data);
        this.stateSubject.next({
          loading: false,
          error: null,
          experiencias: data,
          empresasAgrupadas
        });
      },
      error: err => {
        console.error('Error al cargar experiencias laborales:', err);
        this.stateSubject.next({
          loading: false,
          error: 'Error al cargar experiencias laborales',
          experiencias: [],
          empresasAgrupadas: []
        });
      }
    });
  }

  private groupByEmpresa(data: ExperienciaLaboral[]): EmpresaGroup[] {
    const grupos: { [key: string]: EmpresaGroup } = {};
    data.forEach(exp => {
      if (!grupos[exp.empresa]) {
        grupos[exp.empresa] = {
          empresa: exp.empresa,
          puesto: exp.puesto,
          proyectos: [],
          expanded: false
        };
      }
      grupos[exp.empresa].proyectos.push(exp);
    });
    return Object.values(grupos);
  }
}