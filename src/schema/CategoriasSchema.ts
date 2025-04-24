import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categorias extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  icon: string;
}

export const CategoriasSchema = SchemaFactory.createForClass(Categorias);
