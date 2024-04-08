import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dtos/messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() request: CreateMessageDTO) {
    return this.messagesService.createMessage(request);
  }
}
