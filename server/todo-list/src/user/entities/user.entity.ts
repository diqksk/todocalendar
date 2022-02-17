import { Common } from 'src/commons/entities/time-stamp.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Common {
  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  name: string;
}
