import { ExperienciaLaboral } from './experiencia-laboral';
import { EmpresaGroup } from './empresa-group';

export interface ExperienciaState {
  loading: boolean;
  error: string | null;
  experiencias: ExperienciaLaboral[];
  empresasAgrupadas: EmpresaGroup[];
}