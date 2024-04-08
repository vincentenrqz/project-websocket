import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type MessagesDocument = Messages & Document;

@Schema({ timestamps: true })
export class Messages {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  sender: string;

  @Prop({
    required: true,
    type: String,
  })
  content: string;

  @Prop({
    default: Date.now,
    type: Date,
  })
  timestamp: Date;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
