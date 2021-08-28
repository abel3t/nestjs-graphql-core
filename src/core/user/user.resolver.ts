import { Parent, Query, Resolver } from '@nestjs/graphql';

import { User } from '../../shared/entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(@Parent() user: User): unknown[] {
    return this.userService.getAllUsers();
  }
}
