import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactState } from '../../../../models/contact-state';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class ContactStoreService {
  private stateSubject = new BehaviorSubject<ContactState>({
    loading: false,
    error: null,
    contacto: null,
    formacion: []
  });
  state$ = this.stateSubject.asObservable();
  constructor(private dataService: DataService) {}
  loadFormacion(usuarioId: number): void {
  console.log('Iniciando carga de formación...');

  // Actualiza estado a "loading"
  this.stateSubject.next({
    ...this.stateSubject.value,
    loading: true,
    error: null
  });

  this.dataService.getFormacion(usuarioId).subscribe({
    next: (formacion) => {
      console.log('Formación recibida:', formacion);

      this.stateSubject.next({
        ...this.stateSubject.value,
        loading: false,
        error: null,
        formacion: formacion ?? []
      });
    },
    error: (err) => {
      console.error('Error al cargar formación:', err);

      this.stateSubject.next({
        ...this.stateSubject.value,
        loading: false,
        error: 'Error al cargar formación. Revisa la API o parámetros.',
        formacion: []
      });
    }
  });
}

  loadContacto(): void {
    console.log('Iniciando carga de contacto...');

    // Indicar que empieza la carga
    this.stateSubject.next({
      ...this.stateSubject.value,
      loading: true,
      error: null
    });

    this.dataService.getContacto(1).subscribe({
      next: (contactos) => {
        console.log('Respuesta cruda de la API:', contactos);

        // Manejar tanto array como objeto único
        let contacto: any;
        if (Array.isArray(contactos)) {
          console.log('La API devolvió un arreglo, tomando el primer elemento');
          contacto = contactos.length > 0 ? contactos[0] : null;
        } else {
          console.log('La API devolvió un objeto único');
          contacto = contactos;
        }

        console.log('Contacto seleccionado:', contacto);

        if (!contacto) {
          console.warn('No se encontró contacto en la respuesta');
          this.stateSubject.next({
            loading: false,
            error: 'No se encontró contacto en la respuesta de la API',
            contacto: null,
            formacion: [] // Aseguramos que formacion también se resetea en caso de error
          });
          return;
        }

        const contactoNormalizado = {
          ...contacto,
          fechanacimiento: contacto?.fechanacimiento
            ? this.parseFecha(contacto.fechanacimiento)
            : null
        };

        console.log('Contacto normalizado listo:', contactoNormalizado);

        this.stateSubject.next({
          loading: false,
          error: null,
          contacto: contactoNormalizado,
          formacion: this.stateSubject.value.formacion // Mantenemos la formación cargada previamente
        });
      },
      error: (err) => {
        console.error('Error al cargar contacto:', err);
        console.log('Respuesta completa del error:', err);

        this.stateSubject.next({
          loading: false,
          error: 'Error al cargar contacto. Revisa la API o parámetros.',
          contacto: null
          , formacion: this.stateSubject.value.formacion // Mantenemos la formación cargada previamente
        });
      }
    });
  }

  private parseFecha(fecha: any): Date | null {
    try {
      const parsed = new Date(fecha);
      if (isNaN(parsed.getTime())) {
        console.warn('Fecha inválida, no se pudo parsear:', fecha);
        return null;
      }
      console.log('Fecha parseada correctamente:', parsed);
      return parsed;
    } catch {
      console.error('Excepción al parsear fecha:', fecha);
      return null;
    }
  }
}