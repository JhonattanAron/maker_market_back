import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pedido } from 'src/schema/PedidosSchema';

@Injectable()
export class PedidosService {
  constructor(@InjectModel(Pedido.name) private pedidoModel: Model<Pedido>) {}

  async crearPedido(createPedidoDto: Pedido) {
    const nuevoPedido = new this.pedidoModel({
      id_pedido: createPedidoDto.id_pedido,
      id_user: createPedidoDto.id_user,
      estado: 'pagado',
      pagado: true,
      metodoPago: 'transferencia',
      comprobantePago: 'comprobante123',
      total: createPedidoDto.total,
      fecha: new Date(),
      direccion: createPedidoDto.direccion,
      productos: createPedidoDto.productos,
      seguimiento: createPedidoDto.seguimiento,
    });

    return await nuevoPedido.save();
  }

  async obtenerPedido(id: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  async actualizarPedido(id: string, pedido: Pedido): Promise<Pedido> {
    const updatedPedido = await this.pedidoModel
      .findByIdAndUpdate(id, pedido, {
        new: true,
      })
      .exec();
    if (!updatedPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return updatedPedido;
  }

  async eliminarPedido(id: string): Promise<Pedido> {
    const deletedPedido = await this.pedidoModel.findByIdAndDelete(id).exec();
    if (!deletedPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return deletedPedido;
  }
}
