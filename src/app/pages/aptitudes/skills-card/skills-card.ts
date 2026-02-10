import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { AptitudState } from '../../../models/aptitud-state'
import { AptitudesStoreService } from './state/skills-storage-service';
import { Loading } from '../../../shared/loading/loading';

@Component({
  selector: 'app-aptitudes-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, Loading, DragDropModule],
  templateUrl: './skills-card.html',
  styleUrls: ['./skills-card.scss']
})
export class AptitudesCard implements OnInit {
  state$!: Observable<AptitudState>;

  constructor(private store: AptitudesStoreService) {}

  ngOnInit(): void {
    this.state$ = this.store.state$;
  this.store.loadData();

  // Rotador automático cada 3 segundos
  setInterval(() => {
    this.store.nextSkillGroup();
  }, 3000);

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