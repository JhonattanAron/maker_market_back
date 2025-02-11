import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from 'src/schema/PedidosSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService, MongooseModule],
})
export class PedidosModule {}
