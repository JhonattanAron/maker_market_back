import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating extends Document {
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  opinion?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
