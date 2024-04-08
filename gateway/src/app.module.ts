import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket.module';
import { MessagesModule } from './messages/messages.module';
import { InboxesModule } from './inboxes/inboxes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/project-test'),
    UsersModule,
    SocketModule,
    MessagesModule,
    InboxesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
