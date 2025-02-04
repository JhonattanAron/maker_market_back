import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasService } from './modules/categorias/categorias.service';
import { CategoriasController } from './modules/categorias/categorias.controller';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ProductosService } from './modules/productos/productos.service';
import { ProductosController } from './modules/productos/productos.controller';
import { ProductosModule } from './modules/productos/productos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test_market_maker'),
    UsersModule,
    CategoriasModule,
    PedidosModule,
    ProductosModule,
  ],
  controllers: [AppController, UsersController, CategoriasController, ProductosController],
  providers: [AppService, UsersService, CategoriasService, ProductosService],
})
export class AppModule {}
