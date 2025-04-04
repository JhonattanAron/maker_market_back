import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido } from 'src/schema/PedidosSchema';

@Injectable()
export class PedidosService {
  constructor(@InjectModel(Pedido.name) private pedidoModel: Model<Pedido>) {}

  async crearPedido(pedido: Pedido): Promise<Pedido> {
    const createdPedido = new this.pedidoModel(pedido);
    return createdPedido.save();
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
