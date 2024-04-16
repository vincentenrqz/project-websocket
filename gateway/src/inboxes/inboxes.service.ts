import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inbox } from './schema/inboxes.schema';
import mongoose, { Model } from 'mongoose';
import { CreateInboxDTO } from './dtos/inboxes.dto';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InboxesService {
  constructor(
    @InjectModel(Inbox.name) private inboxModel: Model<Inbox>,
    private messageService: MessagesService,
    private usersService: UsersService,
  ) {}

  async addMessage(request: CreateInboxDTO) {
    const { participants, messages } = request;

    let inbox = await this.inboxModel
      .findOne({ participants: { $all: request.participants } })
      .exec();
    if (!inbox) inbox = await this.createInbox(participants);

    const newMessages = await Promise.all(
      messages.map(async (message) => {
        return await this.messageService.createMessage(message);
      }),
    );

    inbox.messages.push(...newMessages);

    try {
      const savedInbox = await inbox.save();
      return savedInbox;
    } catch (error) {
      console.error('Error occurred while saving inbox:', error);
      throw new Error('Failed to save inbox');
    }
  }

  async createInbox(participants: string[]) {
    const newInbox = new this.inboxModel({ participants });
    try {
      const savedInbox = await newInbox.save();
      return savedInbox;
    } catch (error) {
      console.error('Error while creating inbox:', error);
      throw new Error('Failed to create inbox');
    }
  }

  async allInbox(id: any) {
    const inboxes = await this.inboxModel
      .find({ participants: id })
      .select('participants')
      .exec();

    const inboxesWithUserData = await Promise.all(
      inboxes.map(async (inbox) => {
        const participantsWithUserData = await Promise.all(
          inbox.participants.map(async (participantId) => {
            const userData = await this.usersService.getUserById(
              participantId.toString(),
            );
            return userData;
          }),
        );
        return { ...inbox.toObject(), participants: participantsWithUserData };
      }),
    );

    return inboxesWithUserData;
  }

  async allMessages(id: string) {
    const messages = await this.inboxModel
      .find({ _id: id })
      .select('messages')
      .exec();

    return messages;
  }
}
