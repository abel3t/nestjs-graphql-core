import { Injectable } from '@nestjs/common';

import { User } from '../../shared/entities/user.entity';
import { UserRepository } from '../../shared/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  createUser(user: User): Promise<User> {
    return this._userRepository.save(user);
  }

  getAllUsers(): Promise<unknown[]> {
    return this._userRepository.find({});
  }
}
