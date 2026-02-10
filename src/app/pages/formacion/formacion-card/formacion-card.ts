import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { FormacionState } from '../../../models/formacion-state';
import { FormacionStoreService } from './state/formacion-store';
import { Loading } from '../../../shared/loading/loading';

@Component({
  selector: 'app-formacion-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    //NgOptimizedImage,
    Loading
  ],
  templateUrl: './formacion-card.html',
  styleUrls: ['./formacion-card.scss']
})
export class FormacionCardComponent implements OnInit {
  state$!: Observable<FormacionState>;

  constructor(private store: FormacionStoreService) {}

  ngOnInit(): void {
    this.state$ = this.store.state$;
    this.store.loadFormacion(1); // usuarioId
    // Rotador automático cada 5 segundos
    setInterval(() => {
      this.store.nextFormacion();
    }, 5000);

  }
}