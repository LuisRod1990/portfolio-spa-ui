import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-icon',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './info-icon.html',
  styleUrls: ['./info-icon.scss']
})
export class InfoIconComponent implements OnInit {
  @Input() tooltipText: string = 'Información';
  showLabel: boolean = true;
  fadingOut: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Mantener visible 2 segundos
    setTimeout(() => {
      this.fadingOut = true;
      this.cdr.detectChanges(); // fuerza actualización inmediata

      // esperar a que termine la animación antes de quitar del DOM
      setTimeout(() => {
        this.showLabel = false;
        this.cdr.detectChanges(); // vuelve a refrescar
      }, 500); // duración del fade-out
    }, 7000); // tiempo visible antes de desaparecer
  }
}