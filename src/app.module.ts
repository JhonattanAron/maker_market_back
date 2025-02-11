import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ProductosModule } from './modules/productos/productos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test_market_maker'),
    UsersModule,
    CategoriasModule,
    PedidosModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
