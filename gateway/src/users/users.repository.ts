import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { UserDTO } from './dtos/users.dto';

export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return this.userModel.find();
  }

  async createUser(req: UserDTO) {
    const newUser = new this.userModel(req);
    return await newUser.save();
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }
}
