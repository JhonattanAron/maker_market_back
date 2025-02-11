import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pedido extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: Number, required: true })
  idCliente: number;

  @Prop({ type: Number, required: true })
  idProducto: number;

  @Prop({ type: Number, required: true })
  cantidad: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Date, required: true })
  fecha: Date;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
