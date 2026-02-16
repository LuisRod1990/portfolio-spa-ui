import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-icon',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  templateUrl: './info-icon.html',
  styleUrls: ['./info-icon.scss']
})
export class InfoIconComponent {
  @Input() tooltipText: string = 'Información';
}