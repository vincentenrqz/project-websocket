import { Module } from '@nestjs/common';
import { GatewayModule } from './socket/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
