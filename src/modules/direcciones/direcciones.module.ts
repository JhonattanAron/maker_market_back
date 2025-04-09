import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionesController } from './direcciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Direccion, DireccionSchema } from 'src/schema/DireccionesSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Direccion.name, schema: DireccionSchema },
    ]),
  ],
  controllers: [DireccionesController],
  providers: [DireccionesService],
  exports: [DireccionesService, MongooseModule],
})
export class DireccionesModule {}
