import { Formacion } from './formacion';
export interface FormacionState {
  loading: boolean;
  error: string | null;
  formaciones: Formacion[];
  currentIndex: number;
}