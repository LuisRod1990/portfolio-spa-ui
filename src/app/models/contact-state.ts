import { Contacto } from '../models/contacto';

export interface ContactState {
  loading: boolean;
  error: string | null;
  contacto: Contacto | null;
}