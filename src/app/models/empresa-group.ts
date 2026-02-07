import   {ExperienciaLaboral} from '../../app/models/experiencia-laboral'; 
export interface EmpresaGroup {
  empresa: string;
  puesto: string;
  proyectos: ExperienciaLaboral[];
  expanded: boolean;
  loadingExpand?: boolean;
}