import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { ProductosModule } from './modules/productos/productos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DireccionesController } from './modules/direcciones/direcciones.controller';
import { DireccionesModule } from './modules/direcciones/direcciones.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test_market_maker'),
    UsersModule,
    CategoriasModule,
    PedidosModule,
    ProductosModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DireccionesModule,
  ],
  controllers: [AppController, DireccionesController],
  providers: [AppService],
})
export class AppModule {}
