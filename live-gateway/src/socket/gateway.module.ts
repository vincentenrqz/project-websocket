import { Module } from '@nestjs/common';
import { MessagingGateway } from './gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagingGateway],
})
export class GatewayModule {}
