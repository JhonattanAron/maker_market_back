import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Direccion extends Document {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  apellido: string;

  @Prop({ type: String, required: true })
  telefono: string;

  @Prop({ type: String, required: true })
  calle: string;

  @Prop({ type: String, required: true })
  lugar: string;

  @Prop({ type: String, required: true })
  ciudad: string;

  @Prop({ type: String, required: true })
  estado: string;

  @Prop({ type: String, required: true })
  codigoPostal: string;

  @Prop({ type: String, required: true })
  pais: string;

  @Prop({ type: String, required: true })
  clienteId: string;
  @Prop({ type: Boolean, required: true })
  principal: boolean;
}

export const DireccionSchema = SchemaFactory.createForClass(Direccion);
