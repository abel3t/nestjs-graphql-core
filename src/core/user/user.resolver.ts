import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../../shared/entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('user') user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Query(() => [User])
  users(): Promise<unknown[]> {
    return this.userService.getAllUsers();
  }
}
