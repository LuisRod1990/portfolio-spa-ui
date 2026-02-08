import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactState } from '../../../../models/contact-state';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class ContactStoreService {
  private stateSubject = new BehaviorSubject<ContactState>({
    loading: false,
    error: null,
    contacto: null
  });

  state$ = this.stateSubject.asObservable();

  constructor(private dataService: DataService) {}

  loadContacto(): void {
    // Indicar que empieza la carga
    this.stateSubject.next({
      ...this.stateSubject.value,
      loading: true,
      error: null
    });

    this.dataService.getContacto(1).subscribe({
      next: (contactos) => {
        const contacto = Array.isArray(contactos) ? contactos[0] : contactos;
        const contactoNormalizado = {
          ...contacto,
          fechanacimiento: contacto?.fechanacimiento
            ? this.parseFecha(contacto.fechanacimiento)
            : null
        };

        this.stateSubject.next({
          loading: false,
          error: null,
          contacto: contactoNormalizado
        });
      },
      error: (err) => {
        console.error('Error al cargar contacto:', err);
        console.log('Respuesta completa del error:', err);
        // Guardamos un mensaje claro en el estado
        this.stateSubject.next({
          loading: false,
          error: 'Error al cargar contacto. Revisa la API o parámetros.',
          contacto: null
        });
      }
    });
  }

  private parseFecha(fecha: any): Date | null {
    try {
      const parsed = new Date(fecha);
      return isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      console.log('Fecha inválida:', fecha);
      return null;
    }
  }
}