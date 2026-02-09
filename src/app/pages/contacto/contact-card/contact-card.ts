import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Loading } from '../../../shared/loading/loading';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardImage, MatCardContent, MatCardModule, MatCardSubtitle, MatCardHeader } from '@angular/material/card';
import { ContactStoreService } from '../../contacto/contact-card/state/contact-store.service';
import { Observable } from 'rxjs';
import { ContactState } from '../../../models/contact-state';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatCardImage,
    Loading,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatCardModule,
    CommonModule,
],
  templateUrl: './contact-card.html',
  styleUrls: ['./contact-card.scss'],
})
export class ContactCardComponent implements OnInit {
  state$!: Observable<ContactState>;
  photoUrl: string = 'assets/images/FOTO_CV.png';
  photoName: string = 'Luis Rodríguez';
  constructor(private store: ContactStoreService) {}

  ngOnInit(): void {
    console.log('ContactCardComponent inicializado, cargando contacto...');
    this.state$ = this.store.state$;
    console.log('Suscripción al estado del contacto establecida');
    this.store.loadContacto();
    console.log('loadContacto() llamado');
    this.store.loadFormacion(1);
    console.log('loadFormacion() llamado');
  }
}