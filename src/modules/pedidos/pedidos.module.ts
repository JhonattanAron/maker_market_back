import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from 'src/schema/PedidosSchema';
import { Direccion, DireccionSchema } from 'src/schema/DireccionesSchema';
import { Producto, ProductoSchema } from 'src/schema/ProductosSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema },
      { name: Direccion.name, schema: DireccionSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService, MongooseModule],
})
export class PedidosModule {}
