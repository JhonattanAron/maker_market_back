import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from 'src/schema/PedidosSchema';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async crearPedido(@Body() pedido: Pedido): Promise<Pedido> {
    const result = await this.pedidosService.crearPedido(pedido);
    return result as Pedido;
  }

  @Get(':id')
  async obtenerPedido(@Param('id') id: string): Promise<Pedido> {
    const pedido = await this.pedidosService.obtenerPedido(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  @Put(':id')
  async actualizarPedido(
    @Param('id') id: string,
    @Body() pedido: Pedido,
  ): Promise<Pedido> {
    const updatedPedido = await this.pedidosService.actualizarPedido(
      id,
      pedido,
    );
    if (!updatedPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return updatedPedido;
  }

  @Delete(':id')
  async eliminarPedido(@Param('id') id: string): Promise<Pedido> {
    const deletedPedido = await this.pedidosService.eliminarPedido(id);
    if (!deletedPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return deletedPedido;
  }
}
