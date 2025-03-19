import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schema/UserSchema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: User) {
    return {
      ususario: this.usersService.crearUsuario(createUserDto),
      status: 200,
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.actualizarUsuario(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.eliminarUsuario(id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.obtenerUsuarios(id);
  }
}
