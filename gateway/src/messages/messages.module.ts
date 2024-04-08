import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, MessagesSchema } from './schema/messages.schema';
import { InboxesModule } from 'src/inboxes/inboxes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Messages.name,
        schema: MessagesSchema,
      },
    ]),
    InboxesModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
