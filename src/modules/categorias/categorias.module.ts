import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categorias, CategoriasSchema } from 'src/schema/CategoriasSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categorias.name, schema: CategoriasSchema },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
