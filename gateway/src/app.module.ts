import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/project-test'),
    UsersModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
