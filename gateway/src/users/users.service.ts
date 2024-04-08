import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/users.dto';
import { UsersRepository } from './users.repository';

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
}
