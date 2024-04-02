import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { UserEntity } from '../../user/models/user.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  users: UserEntity[];
}
