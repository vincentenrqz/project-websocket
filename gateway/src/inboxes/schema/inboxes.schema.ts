import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Messages, MessagesSchema } from 'src/messages/schema/messages.schema';
import { User } from 'src/users/schema/users.schema';
import { CreateMessageDTO } from 'src/messages/dtos/messages.dto';
export type InboxDocument = Inbox & Document;

@Schema({ timestamps: true })
export class Inbox {
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  participants: User[];

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'Messages' }],
    default: [],
  })
  messages: Messages[];
}

export const InboxSchema = SchemaFactory.createForClass(Inbox);
