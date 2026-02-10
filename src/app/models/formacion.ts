export interface Formacion {
  formacionid: number;
  usuarioid: number;
  nivel: string;
  institucion: string;
  titulo: string;
  ubicacion: string;
  fechainicio: string;
  fechafin: string;
  urlfoto1?: string;
  urlfoto2?: string;
  urlsitio1?: string;
  urlsitio2?: string;
}