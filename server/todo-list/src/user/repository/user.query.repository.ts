import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUser(options: FindOneOptions): Promise<User> {
    const result = await this.findOne(options);
    return result;
  }
}
