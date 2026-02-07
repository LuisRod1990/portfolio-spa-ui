import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss']
})
export class Loading {
  @Input() message: string = 'Cargando...';
}