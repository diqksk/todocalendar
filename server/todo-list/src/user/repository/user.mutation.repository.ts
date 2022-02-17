import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserMutationRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const result = this.save(createUserDto);
    return result;
  }

  async findUser(id: number): Promise<User> {
    const result = await this.findOne(id);
    return result;
  }

  async removeUser(id: number): Promise<UpdateResult> {
    const result = await this.softDelete({ id });
    return result;
  }
}
