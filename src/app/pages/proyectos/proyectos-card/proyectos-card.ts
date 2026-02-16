import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable } from 'rxjs';
import { ProyectoState } from '../../../models/proyecto-state';
import { Proyecto } from '../../../models/proyecto';
import { ProyectosStoreService } from './state/proyectos-store';
import { Loading } from '../../../shared/loading/loading';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-proyectos-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    Loading
    
  ],
  templateUrl: './proyectos-card.html',
  styleUrls: ['./proyectos-card.scss']
})
export class ProyectosCardComponent implements OnInit {
  state$!: Observable<ProyectoState>;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private store: ProyectosStoreService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.state$ = this.store.state$;
    this.store.loadProyectos();
  }

  selectProyecto(proyecto: Proyecto): void {
    this.store.selectProyecto(proyecto);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(proyecto.url);
  }

  closeProyecto(): void {
    this.store.closeProyecto();
    this.safeUrl = null;
  }
}