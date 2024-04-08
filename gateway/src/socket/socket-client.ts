import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
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
      console.log(payload);
    });

    this.socketClient.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }
}
