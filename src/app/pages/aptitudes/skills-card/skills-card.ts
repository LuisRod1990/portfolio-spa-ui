import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { InfoIconComponent } from '../../../info-icon/info-icon'; 
import { AptitudState } from '../../../models/aptitud-state';
import { AptitudesStoreService } from './state/skills-storage-service';
import { Loading } from '../../../shared/loading/loading';

@Component({
  selector: 'app-aptitudes-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, Loading, DragDropModule, InfoIconComponent],
  templateUrl: './skills-card.html',
  styleUrls: ['./skills-card.scss']
})
export class AptitudesCard implements OnInit, OnDestroy {
  state$!: Observable<AptitudState>;
  private rotadorSub!: any;

  constructor(private store: AptitudesStoreService) {}

  ngOnInit(): void {
    // El AuthGuard ya garantiza que hay sesión válida antes de entrar aquí
    this.state$ = this.store.state$;
    this.store.loadData();

    // Rotador automático cada 3 segundos
    this.rotadorSub = setInterval(() => {
      this.store.nextSkillGroup();
    }, 3000);
  }

  ngOnDestroy(): void {
    // Limpieza del intervalo para evitar fugas de memoria
    if (this.rotadorSub) {
      clearInterval(this.rotadorSub);
    }
  }

  toggleMenu(): void {
    this.store.toggleMenu();
  }

  toggleTheme(): void {
    this.store.toggleTheme();
  }

  changeLayout(layout: 'two-top-one-bottom' | 'two-columns' | 'two-right-one-left'): void {
    this.store.changeLayout(layout);
  }

  nextSkillGroup(): void {
    this.store.nextSkillGroup();
  }
}