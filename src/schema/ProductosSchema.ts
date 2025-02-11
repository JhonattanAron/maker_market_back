import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id_: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: String, required: true })
  image: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
