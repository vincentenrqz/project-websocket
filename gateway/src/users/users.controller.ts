import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dtos/users.dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() req: UserDTO) {
    return this.userService.createUser(req);
  }

  @Get('/get-by-participants')
  getParticipants(@Body() participants: string[]) {
    return this.userService.getByParticipants(participants);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
