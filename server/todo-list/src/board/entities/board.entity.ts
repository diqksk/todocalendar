import { Common } from 'src/commons/entities/time-stamp.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Board extends Common {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
