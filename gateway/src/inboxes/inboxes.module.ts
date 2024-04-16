import { Module, forwardRef } from '@nestjs/common';
import { InboxesController } from './inboxes.controller';
import { InboxesService } from './inboxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inbox, InboxSchema } from './schema/inboxes.schema';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inbox.name,
        schema: InboxSchema,
      },
    ]),
    MessagesModule,
    UsersModule,
  ],
  controllers: [InboxesController],
  providers: [InboxesService],
  exports: [InboxesService],
})
export class InboxesModule {}
