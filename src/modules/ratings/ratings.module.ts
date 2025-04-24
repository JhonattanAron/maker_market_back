import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from 'src/schema/RatingSchema';
import { User, UserSchema } from 'src/schema/UserSchema';
import { RatingsService } from './ratings.service';
import { Producto, ProductoSchema } from 'src/schema/ProductosSchema';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: User.name, schema: UserSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService, MongooseModule],
})
export class RatingsModule {}
