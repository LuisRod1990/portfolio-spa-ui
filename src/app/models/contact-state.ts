import { Contacto } from '../models/contacto';
import { Formacion } from './formacion';
export interface ContactState {
  loading: boolean;
  error: string | null;
  contacto: Contacto | null;
  formacion: Formacion[];
}