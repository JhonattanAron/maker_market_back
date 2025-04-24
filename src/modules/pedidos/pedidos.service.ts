import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Direccion } from 'src/schema/DireccionesSchema';
import { Pedido } from 'src/schema/PedidosSchema';
import { Producto } from 'src/schema/ProductosSchema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    @InjectModel(Direccion.name) private direccionModel: Model<Direccion>,
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
  ) {}

  async crearPedido(createPedidoDto: Pedido) {
    const subtotal = createPedidoDto.total - createPedidoDto.total * 0.12;
    const envio = createPedidoDto.envio;
    const inpuestos = createPedidoDto.total * 0.12;
    const nuevoPedido = new this.pedidoModel({
      id_pedido: createPedidoDto.id_pedido,
      id_user: createPedidoDto.id_user,
      estado: 'pagado',
      pagado: true,
      metodoPago: 'transferencia',
      comprobantePago: 'comprobante123',
      total: createPedidoDto.total,
      subtotal: subtotal,
      envio: envio,
      impuesto: inpuestos,
      fecha: new Date(),
      direccion: createPedidoDto.direccion,
      productos: createPedidoDto.productos,
      seguimiento: createPedidoDto.seguimiento,
    });

    return await nuevoPedido.save();
  }

  async obtenerPedido(id_pedido: string): Promise<any> {
    const pedido = await this.pedidoModel.findOne({ id_pedido }).exec();

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id_pedido} no encontrado`);
    }

    // Obtener la dirección usando el id de pedido
    const direccion = await this.direccionModel
      .findById(pedido.direccion)
      .exec();

    // Crear un nuevo objeto con la dirección incluida
    const pedidoConDireccion = {
      ...pedido.toObject(), // convierte el documento mongoose a un objeto plano
      direccion: direccion ? direccion.toObject() : null,
    };

    return pedidoConDireccion;
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

  async obtenerPedidosPaginados(
    userId: string,
    page = 1,
    limit = 10,
  ): Promise<any[]> {
    const skip = (page - 1) * limit;

    const pedidos = await this.pedidoModel
      .find({ id_user: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    const pedidosConInfo = await Promise.all(
      pedidos.map(async (pedido) => {
        const direccion = await this.direccionModel
          .findById(pedido.direccion)
          .exec();

        const productosDetallados = await Promise.all(
          pedido.productos.map(async (p) => {
            const producto = await this.productoModel
              .findById(p.productoId)
              .exec();

            return {
              productoId: p.productoId,
              cantidad: p.cantidad,
              nombre: producto?.name || null,
              precio: producto?.price || null,
              imagen: producto?.options[0].image || null,
            };
          }),
        );

        return {
          ...pedido.toObject(),
          direccion: direccion ? direccion.toObject() : null,
          productos: productosDetallados,
        };
      }),
    );

    return pedidosConInfo;
  }
}
