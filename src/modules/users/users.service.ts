import { Injectable } from '@nestjs/common';
import User from 'src/interfaces/User';

@Injectable()
export class UsersService {
  private usuarios: User[] = [];

  crearUsuario(usuario: User) {
    return usuario;
  }

  obtenerUsuarios(id: string) {
    return id;
  }

  actualizarUsuario(id: string, usuario: User) {
    return usuario;
  }

  eliminarUsuario(id: string) {
    return id;
  }
}
