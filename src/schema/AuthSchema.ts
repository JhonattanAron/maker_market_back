import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
