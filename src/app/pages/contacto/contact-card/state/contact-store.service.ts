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
        // La API devuelve un arreglo, tomamos el primer elemento
        const contacto = Array.isArray(contactos) ? contactos[0] : contactos;
        // Normalizamos la fecha con validación
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
        this.stateSubject.next({
          loading: false,
          error: 'Error al cargar contacto',
          contacto: null
        });
      }
    });
  }

  /**
   * Intenta parsear la fecha de forma segura.
   * Si el formato es inválido, devuelve null en vez de romper.
   */
  private parseFecha(fecha: any): Date | null {
    try {
      const parsed = new Date(fecha);
      return isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      return null;
    }
  }
}