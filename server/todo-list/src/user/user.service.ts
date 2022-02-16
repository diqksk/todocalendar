import { Injectable } from '@nestjs/common';
import { ResponseError } from 'src/commons/utils/error/custom.error';
import { ErrorStatus } from 'src/commons/utils/types/status.enum';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMutationRepository } from './repository/user.mutation.repository';
import { UserQueryRepository } from './repository/user.query.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userMutationRepository: UserMutationRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { userId: createUserDto.userId },
    };
    const findResult = await this.userQueryRepository.findUser(options);

    if (findResult) {
      throw new ResponseError(
        ErrorStatus.ALREADY_EXIST,
        '해당 아이디가 이미 존재합니다.',
      );
    }

    try {
      const result = await this.userMutationRepository.createUser(
        createUserDto,
      );
      return result;
    } catch (e) {
      console.log(e);
      throw new ResponseError(
        ErrorStatus.SERVER_ERROR,
        '알 수 없는 에러입니다.',
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
