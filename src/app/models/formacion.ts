export interface Formacion {
  formacionid: number;
  usuarioid: number;
  nivel: string;
  institucion: string;
  titulo: string;
  ubicacion: string;
  fechainicio: string; // o Date si prefieres
  fechafin: string;    // o Date si prefieres
}