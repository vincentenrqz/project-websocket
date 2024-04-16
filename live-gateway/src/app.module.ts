import { Module } from '@nestjs/common';
import { GatewayModule } from './socket/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule, GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
