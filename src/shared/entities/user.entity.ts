import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { getUnixTime } from 'date-fns';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity, IBaseEntity } from './base.entity';

interface IUser extends IBaseEntity {
  name?: string;
  email?: string;
  role?: string;
  photo?: string;
}

@ObjectType()
@InputType('user')
@Entity('User')
export class User extends BaseEntity {
  constructor(props?: IUser) {
    const { name, email, role, photo, ...superItem } = props || {};

    super(superItem);

    Object.assign(this, { name, email, role, photo });
  }

  @Field()
  @Column({ type: 'varchar', width: 64, nullable: true })
  name?: string;

  @Field()
  @Column({ type: 'varchar', width: 256 })
  email: string;

  @Field()
  @Column({ type: 'varchar', width: 16 })
  role: string;

  @Field()
  @Column({ type: 'varchar', width: 256, nullable: true })
  photo?: string;

  @BeforeInsert()
  init(): void {
    this.isActive = true;
    this.createdAt = getUnixTime(new Date());
  }

  @BeforeUpdate()
  update(): void {
    this.updatedAt = getUnixTime(new Date());
  }
}
