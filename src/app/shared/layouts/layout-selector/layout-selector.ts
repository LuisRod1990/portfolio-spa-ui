import { Component, Input } from '@angular/core';
import { LayoutType } from '../layout-type';
import { MatIconModule } from '@angular/material/icon';

@Component({
selector: 'app-layout-selector',
templateUrl: './layout-selector.html',
styleUrls: ['./layout-selector.scss'],
imports: [MatIconModule]
})
export class LayoutSelectorComponent {
@Input() layoutType: LayoutType = LayoutType.TWO_TOP_ONE_BOTTOM;
@Input() isDarkTheme: boolean = false;

LayoutType = LayoutType;
menuOpen: boolean = true; // inicia abierto
closing: boolean = false;

changeLayout(layout: LayoutType) {
this.layoutType = layout;
}

toggleTheme() {
this.isDarkTheme = !this.isDarkTheme;
}

toggleMenu() {
if (this.menuOpen) {
this.closing = true;
setTimeout(() => {
this.menuOpen = false;
this.closing = false;
}, 400); // duración animación salida
} else {
this.menuOpen = true;
}
}
}
