export interface Contacto {
  usuarioid: number| null;
  usuario: string| null;
  nombre: string| null;
  apellidos: string| null;
  fechanacimiento: string;
  titulo: string | null;
  foto: string | null;
  cedula: string| null;
  rfc: string| null;
  curp: string| null;
  resumenperfil: string;
  email: string| null;
  celular?: string| null;
  telefono?: string | null;
  direccion?: string| null;
}