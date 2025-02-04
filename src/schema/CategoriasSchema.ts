import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categorias extends Document {
  @Prop()
  _id: number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
}

export const CategoriasSchema = SchemaFactory.createForClass(Categorias);
