import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { InboxesService } from 'src/inboxes/inboxes.service';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor(private inboxService: InboxesService) {
    this.socketClient = io('http://localhost:4001');
  }

  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('Connected to live gateway');
    });

    this.socketClient.on('onMessage', (payload: any) => {
      if (!payload) throw new HttpException('Something went wrong', 404);
      this.inboxService.addMessage(payload);
    });

    this.socketClient.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }
}
