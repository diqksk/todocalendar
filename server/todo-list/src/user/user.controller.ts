import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseInterceptors } from '@nestjs/common';
import { ExceptionInterCeptor } from 'src/commons/utils/ExceptionInterceptor';
import { Success } from 'src/commons/utils/response/custom.response';
import {
  ErrorStatus,
  SuccessStatus,
} from 'src/commons/utils/types/status.enum';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseError } from 'src/commons/utils/error/custom.error';

@UseInterceptors(ExceptionInterCeptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<Success> {
    const data = await this.userService.create(createUserDto);

    return new Success(SuccessStatus.SUCCESS, data);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<Success> {
    const data = await this.userService.login(loginUserDto);

    return new Success(SuccessStatus.SUCCESS, data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('check/:id')
  async checkSignUpUser(@Param('id') userId: string) {
    if (userId.length < 3)
      throw new ResponseError(
        ErrorStatus.INVALID_PARAMETER,
        '아이디는 3글자 이상이 필요합니다.',
      );

    const data = await this.userService.checkValidId(userId);
    return new Success(SuccessStatus.SUCCESS, data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
