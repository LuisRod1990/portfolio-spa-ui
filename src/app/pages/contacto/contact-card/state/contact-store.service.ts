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
    this.stateSubject.next({ ...this.stateSubject.value, loading: true, error: null });

    this.dataService.getContacto(1).subscribe({
      next: contactos => {
        // 🔹 La API devuelve un arreglo, tomamos el primer elemento
        const contacto = Array.isArray(contactos) ? contactos[0] : contactos;

        console.log('Contacto cargado (raw object):', contacto);
        console.log('Contacto cargado (JSON):', JSON.stringify(contacto, null, 2));

        // 🔹 Normalizamos la fecha para que el pipe date funcione
        const contactoNormalizado = {
          ...contacto,
          fechanacimiento: new Date(contacto.fechanacimiento)
        };

        this.stateSubject.next({
          loading: false,
          error: null,
          contacto: contactoNormalizado
        });
      },
      error: err => {
        console.error('Error al cargar contacto:', err);
        this.stateSubject.next({
          loading: false,
          error: 'Error al cargar contacto',
          contacto: null
        });
      }
    });
  }
}