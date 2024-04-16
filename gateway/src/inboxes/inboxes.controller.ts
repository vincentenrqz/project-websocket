import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InboxesService } from './inboxes.service';
import { CreateInboxDTO } from './dtos/inboxes.dto';

@Controller('inboxes')
export class InboxesController {
  constructor(private inboxSerice: InboxesService) {}

  @Post()
  async createInbox(@Body() request: CreateInboxDTO) {
    return await this.inboxSerice.addMessage(request);
  }

  @Get('/messages/:id')
  allMessages(@Param('id') id: string) {
    return this.inboxSerice.allMessages(id);
  }

  @Get('/:id')
  allInbox(@Param('id') id: string) {
    return this.inboxSerice.allInbox(id);
  }
}
