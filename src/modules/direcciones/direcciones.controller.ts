import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { Direccion } from 'src/schema/DireccionesSchema';

@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Get('cliente/:clienteId')
  async obtenerDireccionesPorClientePaginadas(
    @Param('clienteId') clienteId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<{
    total: number;
    page: number;
    pageSize: number;
    direcciones: Direccion[];
  }> {
    return this.direccionesService.obtenerDireccionesPorClientePaginadas(
      clienteId,
      Number(page),
      Number(pageSize),
    );
  }
  @Post()
  async crearDireccion(@Body() direccion: Direccion): Promise<Direccion> {
    const result = await this.direccionesService.crearDireccion(direccion);
    if ('success' in result && !result.success) {
      throw new Error(result.message);
    }
    return result as Direccion;
  }
  @Get(':id')
  async obtenerDireccionPorId(@Param('id') id: string): Promise<Direccion> {
    return this.direccionesService.obtenerDireccionPorId(id);
  }

  @Put(':id')
  async actualizarDireccion(
    @Param('id') id: string,
    @Body() direccionActualizada: Partial<Direccion>,
  ): Promise<Direccion> {
    return this.direccionesService.actualizarDireccion(
      id,
      direccionActualizada,
    );
  }

  @Delete(':id')
  async eliminarDireccion(
    @Param('id') id: string,
  ): Promise<{ success: boolean }> {
    return this.direccionesService.eliminarDireccion(id);
  }
}
