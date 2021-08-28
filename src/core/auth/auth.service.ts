import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../shared/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private _userRepository: UserRepository) {}

  getProfile(): unknown {
    return this._userRepository.find();
  }
}
