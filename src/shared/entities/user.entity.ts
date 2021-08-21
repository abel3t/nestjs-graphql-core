import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: 'users'
})
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column({ type: 'varchar', width: 64, nullable: true })
  name: string;

  @Field()
  @Column({ type: 'varchar', width: 64, nullable: true })
  password: string;

  @Field()
  @Column({ type: 'varchar', width: 64, nullable: true })
  role: string;
}
