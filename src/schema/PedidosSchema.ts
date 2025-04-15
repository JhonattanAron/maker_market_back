import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  ProductoEstado,
  SeguimientoProducto,
} from 'src/interfaces/pedidosInterface';

@Schema()
export class Pedido extends Document {
  @Prop({ type: String, required: true, unique: true })
  id_pedido: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  id_user: Types.ObjectId;

  @Prop({ type: String, required: true })
  estado: string;

  @Prop({ type: Boolean, required: true })
  pagado: boolean;

  @Prop({ type: String, required: true })
  metodoPago: string;

  @Prop({ type: String, required: true })
  comprobantePago: string;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Date, required: true })
  fecha: Date;
  @Prop({ type: Types.ObjectId, ref: 'Direccion', required: true })
  direccion: Types.ObjectId;

  @Prop({
    type: [
      {
        productoId: { type: String, required: true },
        estadoProducto: { type: String, required: true },
        cantidad: { type: Number, required: true, default: 1 },
      },
    ],
    required: true,
  })
  productos: ProductoEstado[];

  @Prop({
    type: [
      {
        fecha: { type: Date, required: true },
        titulo: { type: String, require: true },
        descripcion: { type: String, required: true },
      },
    ],
    required: false,
  })
  seguimiento: SeguimientoProducto[];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
