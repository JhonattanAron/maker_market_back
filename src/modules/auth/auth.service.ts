import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schema/UserSchema';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(
    email: string,
    pass: string,
    res: Response,
  ): Promise<{ message: string }> {
    // Verificar si el usuario existe
    const user = await this.userService.obtenerUsuarios(email);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear el payload para el token
    const payload = { username: user.name, sub: user._id };
    console.log('Payload:', payload);

    // Generar el token JWT
    const token = this.jwtService.sign(payload);
    console.log('Generated Token:', token);

    res.cookie('jwt', token, {
      httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo usar HTTPS en producción
      sameSite: 'strict', // Evitar envío de cookies en solicitudes de terceros
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    return { message: 'Login exitoso' };
  }
}
