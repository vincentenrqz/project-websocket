import { Module } from '@nestjs/common';
import { SocketClient } from './socket-client';
import { InboxesModule } from 'src/inboxes/inboxes.module';

@Module({
  imports: [InboxesModule],
  providers: [SocketClient],
})
export class SocketModule {}
