import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid'; // Importar nanoid para generar códigos únicos
import { OptionItem } from 'src/interfaces/ProductosInterfaces';

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

  @Prop({ type: Number, required: false, default: 0 })
  sold: number;

  @Prop({ type: Date, required: false, default: Date.now })
  create_at: Date;

  @Prop({ type: Number, required: false, default: 0 })
  discountPrice: number;

  @Prop({ type: Number, required: false, default: 0 })
  porcentaje: number;

  @Prop({ type: Number, required: false, default: 5 })
  valoracion: number;
  @Prop({ type: Number, required: false, default: 0 })
  valoraciones_totales: number;
  @Prop({ type: Boolean, required: true, default: false })
  internacional: boolean;
  @Prop({ type: String, required: false })
  origen: string;
  @Prop({ type: String, required: false })
  details: string;
  @Prop({
    type: [
      {
        name: { type: String, require: true },
        image: { type: String, require: true },
      },
    ],
    required: false,
    default: false,
  })
  options: OptionItem[];
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
