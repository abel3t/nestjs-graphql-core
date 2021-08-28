import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): unknown[] {
    return [{ name: 'Abel Tran' }];
  }
}
