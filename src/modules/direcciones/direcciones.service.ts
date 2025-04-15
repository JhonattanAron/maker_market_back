import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    console.log('direccion', direccion);
    if (direccion.principal) {
      console.log('Es principal', 'Modificando');
      await this.direccionModel.updateMany(
        { clienteId: direccion.clienteId, principal: true },
        { $set: { principal: false } },
      );
    }
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
    principal: Direccion | null;
  }> {
    const filter = { clienteId };
    const total = await this.direccionModel.countDocuments(filter);
    const direcciones = await this.direccionModel
      .find(filter)
      .sort({ principal: -1 }) // Ordenar por el campo 'principal', true primero
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const principal = await this.direccionModel
      .findOne({ clienteId, principal: true })
      .exec();

    return { total, page, pageSize, direcciones, principal };
  }

  async obtenerDireccionPorId(id: string): Promise<Direccion> {
    const direccion = await this.direccionModel.findById(id).exec();
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return direccion;
  }

  async actualizarDireccion(
    id: string,
    clienteId: string,
    direccionActualizada: Partial<Direccion>,
  ): Promise<Direccion> {
    const direccionExistente = await this.direccionModel.findById(id).exec();
    const principal = direccionActualizada.principal;
    if (!direccionExistente) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    if (direccionExistente.clienteId.toString() !== clienteId) {
      throw new ForbiddenException(`La dirección no pertenece al cliente`);
    }
    if (principal) {
      this.actualizarDireccionPrincipal(direccionActualizada.id, clienteId);
    }
    const direccion = await this.direccionModel
      .findByIdAndUpdate(id, direccionActualizada, { new: true })
      .exec();
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return direccion;
  }

  async eliminarDireccion(
    id: string,
    clientId: string,
  ): Promise<{ success: boolean }> {
    const resultado = await this.direccionModel.findById(id);
    if (!resultado) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    if (resultado.clienteId.toString() !== clientId) {
      throw new ForbiddenException(`La dirección no pertenece al cliente`);
    }
    await resultado.deleteOne();
    return { success: true };
  }

  async actualizarDireccionPrincipal(
    id: string,
    clienteId: string,
  ): Promise<Direccion> {
    const direccion = await this.direccionModel.findById(id).exec();
    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }

    if (direccion.clienteId.toString() !== clienteId) {
      throw new NotFoundException(
        `La dirección no pertenece al cliente con ID ${clienteId}`,
      );
    }

    await this.direccionModel.updateMany(
      { clienteId },
      { $set: { principal: false } },
    );

    const direccionActualizada = await this.direccionModel
      .findByIdAndUpdate(id, { principal: true }, { new: true })
      .exec();

    if (!direccionActualizada) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }
    return direccionActualizada;
  }
}
