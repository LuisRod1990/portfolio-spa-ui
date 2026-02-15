import { Proyecto } from './proyecto'
export interface ProyectoState {
  loading: boolean;
  error: string | null;
  proyectos: Proyecto[];
  selectedProyecto: Proyecto | null;
}
