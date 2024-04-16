import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/users.dto';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  getUsers() {
    return this.userRepo.getUsers();
  }

  createUser(req: UserDTO) {
    return this.userRepo.createUser(req);
  }

  getUserById(id: string) {
    return this.userRepo.getUserById(id);
  }

  getByParticipants(participants: string[]) {
    return this.userRepo.getUserByParticipants(participants);
  }
}
