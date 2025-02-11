import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from 'src/schema/ProductosSchema';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService, MongooseModule],
})
export class ProductosModule {}
