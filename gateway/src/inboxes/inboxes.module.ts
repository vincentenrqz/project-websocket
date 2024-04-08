import { Module } from '@nestjs/common';
import { InboxesController } from './inboxes.controller';
import { InboxesService } from './inboxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inbox, InboxSchema } from './schema/inboxes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inbox.name,
        schema: InboxSchema,
      },
    ]),
  ],
  controllers: [InboxesController],
  providers: [InboxesService],
  exports: [InboxesService],
})
export class InboxesModule {}
