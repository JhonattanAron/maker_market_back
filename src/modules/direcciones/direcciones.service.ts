import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Direccion } from 'src/schema/DireccionesSchema';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectModel(Direccion.name) private direccionModel: Model<Direccion>,
  ) {}

  async crearDireccion(
    direccion: Direccion,
  ): Promise<Direccion | { success: boolean; message: string }> {
    const direccionesRecientes = await this.direccionModel.countDocuments({
      clienteId: direccion.clienteId,
      createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // Última hora
    });

    if (direccionesRecientes >= 10) {
      return {
        success: false,
        message: 'No puedes crear más de 10 direcciones en una hora',
      };
    }

    const nuevaDireccion = new this.direccionModel(direccion);
    return nuevaDireccion.save();
  }

  async obtenerDireccionesPorClientePaginadas(
    clienteId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    total: number;
    page: number;
    pageSize: number;
    direcciones: Direccion[];
  }> {
    const filter = { clienteId }; // Filtro por cliente
    const total = await this.direccionModel.countDocuments(filter); // Total de direcciones
    const direcciones = await this.direccionModel
      .find(filter)
      .skip((page - 1) * pageSize) // Saltar las direcciones de páginas anteriores
      .limit(pageSize) // Limitar al tamaño de página
      .exec();

    return { total, page, pageSize, direcciones };
  }

  // Obtener una dirección por su ID
  async obtenerDireccionPorId(id: string): Promise<Direccion> {
    const direccion = await this.direccionModel.findById(id).exec();
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return direccion;
  }

  // Actualizar una dirección por su ID
  async actualizarDireccion(
    id: string,
    direccionActualizada: Partial<Direccion>,
  ): Promise<Direccion> {
    const direccion = await this.direccionModel
      .findByIdAndUpdate(id, direccionActualizada, { new: true })
      .exec();
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return direccion;
  }

  // Eliminar una dirección por su ID
  async eliminarDireccion(id: string): Promise<{ success: boolean }> {
    const resultado = await this.direccionModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return { success: true };
  }
}
