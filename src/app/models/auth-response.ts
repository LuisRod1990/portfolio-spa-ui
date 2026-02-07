export interface AuthResponse {
  tokenId: number;
  usuarioId: number;
  accessToken: string;
  refreshToken: string;
  fechaCreacion: string;
  fechaExpiracion: string;
  estado: string;
  usuario: {
    usuarioId: number;
    usuario: string;
    estatusId: number;
    fechaCreacion: string;
    ultimoLogin: string | null;
    usuariosRoles: any;
  };
}