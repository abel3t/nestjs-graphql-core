import { Field, ID } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';

export interface IBaseEntity {
  id?: number;
  createdBy?: string;
  createdAt?: number;
  updatedBy?: string;
  updatedAt?: number;
}

export class BaseEntity {
  constructor(props?: IBaseEntity) {
    Object.assign(this, props || {});
  }

  @Field(() => ID)
  @ObjectIdColumn()
  @Transform(
    ({ value }: TransformFnParams) => new ObjectId(value).toHexString(),
    {
      toPlainOnly: true
    }
  )
  _id: string;

  @Field()
  @Column({ nullable: true })
  createdBy?: string;

  @Field()
  @Column({ nullable: true })
  createdAt?: number;

  @Field()
  @Column({ nullable: true })
  updatedBy?: string;

  @Field()
  @Column({ nullable: true })
  updatedAt?: number;

  @Field()
  @Column()
  isActive?: boolean;
}
