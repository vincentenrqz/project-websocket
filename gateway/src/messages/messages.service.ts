import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from './schema/messages.schema';
import mongoose, { Model } from 'mongoose';
import { CreateMessageDTO } from './dtos/messages.dto';
import { InboxesService } from 'src/inboxes/inboxes.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private messagesModel: Model<Messages>,
  ) {}

  async createMessage(request: CreateMessageDTO): Promise<Messages> {
    const date = new Date();
    const newMsg = new this.messagesModel({
      ...request,
      _id: new mongoose.Types.ObjectId(),
      timestamp: date.toISOString(),
    });
    return await newMsg.save();
  }

  async getMessages() {}
}
