import { Injectable } from '@nestjs/common';
import {
  comparePassword,
  encryptPassword,
} from 'src/commons/utils/bcrypt/bcrypt.util';
import { ResponseError } from 'src/commons/utils/error/custom.error';
import { generateJwt } from 'src/commons/utils/jwt/jwt.util';
import { ErrorStatus } from 'src/commons/utils/types/status.enum';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMutationRepository } from './repository/user.mutation.repository';
import { UserQueryRepository } from './repository/user.query.repository';
import { SignOptions } from 'jsonwebtoken';

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
    //유저검색
    const findResult = await this.userQueryRepository.findUser(options);

    //존재시 익셉션 발생
    if (findResult) {
      throw new ResponseError(
        ErrorStatus.ALREADY_EXIST,
        '해당 아이디가 이미 존재합니다.',
      );
    }

    //패스워드 해싱
    const hashedPassword = await encryptPassword(createUserDto.password);

    //데이터베이스에 삽입
    try {
      const result = await this.userMutationRepository.createUser({
        ...createUserDto,
        password: hashedPassword,
      });

      return result;
    } catch (e) {
      console.log(e);
      throw new ResponseError(
        ErrorStatus.SERVER_ERROR,
        '알 수 없는 에러입니다.',
      );
    }
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<User & { accessToken: string }> {
    const options: FindOneOptions<User> = {
      where: { userId: loginUserDto.userId },
    };
    //유저검색
    const findResult = await this.userQueryRepository.findUser(options);

    //존재하지 않으면 익셉션 발생
    if (!findResult) {
      throw new ResponseError(
        ErrorStatus.NOT_FOUND,
        '사용자가 존재하지 않습니다.',
      );
    }

    //패스워드 비교
    const isValid = await comparePassword(
      loginUserDto.password,
      findResult.password,
    );

    if (!isValid) {
      throw new ResponseError(
        ErrorStatus.BAD_REQUEST,
        '패스워드가 일치하지 않습니다.',
      );
    }

    //토큰생성
    const jwtOptions: SignOptions = { expiresIn: '2h' };
    const accessToken = generateJwt(loginUserDto.userId, jwtOptions);

    return { ...findResult, password: '', accessToken };
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
