import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inbox } from './schema/inboxes.schema';
import { Model } from 'mongoose';
import { CreateInboxDTO } from './dtos/inboxes.dto';

@Injectable()
export class InboxesService {
  constructor(@InjectModel(Inbox.name) private inboxModel: Model<Inbox>) {}

  async createInbox(request: CreateInboxDTO) {
    const newInbox = new this.inboxModel(request);
    return await newInbox.save();
  }
}
