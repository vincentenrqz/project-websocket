import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Messages } from 'src/messages/schema/messages.schema';
import { User } from 'src/users/schema/users.schema';

export type InboxDocument = Inbox & Document;

@Schema({ timestamps: true })
export class Inbox {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  participants: User[];

  @Prop({
    type: Messages,
    default: [],
  })
  messages: Messages[];
}

export const InboxSchema = SchemaFactory.createForClass(Inbox);
