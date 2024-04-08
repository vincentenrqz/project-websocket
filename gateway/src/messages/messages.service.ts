import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from './schema/messages.schema';
import { Model } from 'mongoose';
import { CreateMessageDTO } from './dtos/messages.dto';
import { InboxesService } from 'src/inboxes/inboxes.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private messagesModel: Model<Messages>,
    private inboxService: InboxesService,
  ) {}

  async createMessage(request: CreateMessageDTO) {
    const newMsg = new this.messagesModel(request);

    // const newInbox = new this.inboxService.createInbox();
    return await newMsg.save();
  }
}
