import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Loading } from '../../shared/loading/loading';
import { Observable } from 'rxjs';
import { ExperienciaState } from '../../models/experiencia-state';
import { ExperienciaStoreService } from '../contacto/contact-card/state/experiencia-state';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { InfoIconComponent } from '../../info-icon/info-icon'; 
@Component({
  selector: 'app-experiencia-laboral-card',
  standalone: true,
  imports: [CommonModule, Loading, MatTooltipModule, MatIcon, InfoIconComponent],
  templateUrl: './experience-card.html',
  styleUrls: ['./experience-card.scss'],
})
export class ExperienciaLaboralCard implements OnInit {
  state$!: Observable<ExperienciaState>;
  currentIndex = 0;

  constructor(private store: ExperienciaStoreService,
            private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.state$ = this.store.state$;   // 🔹 conecta el observable
    this.store.loadExperiencias();     // 🔹 dispara la carga
  }

  get visibleEmpresas(): any[] {
    // slice sobre empresas agrupadas
    return this.store['stateSubject'].value.empresasAgrupadas.slice(this.currentIndex, this.currentIndex + 3);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  next(): void {
    if (this.currentIndex + 3 < this.store['stateSubject'].value.empresasAgrupadas.length) {
      this.currentIndex += 3;
    }
  }

  toggleExpand(group: any): void {
    group.expanded = !group.expanded;   // alterna de inmediato
    group.loadingExpand = true;         // activa loader visual

    // Forzar detección de cambios
    this.cd.detectChanges();

    setTimeout(() => {
      group.loadingExpand = false;
      this.cd.detectChanges();          // refresca al terminar loading
    }, 600);
  }
}