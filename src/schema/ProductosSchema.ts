import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid'; // Importar nanoid para generar códigos únicos

@Schema()
export class Producto extends Document {
  @Prop({
    type: String,
    required: false,
    unique: true,
    default: () => nanoid(10),
  })
  code: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  supplier: string;

  @Prop({ type: String, required: true })
  sku: string;

  @Prop({ type: [String], required: false }) // Nueva propiedad para imágenes
  images: string[];
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
