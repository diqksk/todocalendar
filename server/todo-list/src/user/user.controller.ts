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
import { SuccessStatus } from 'src/commons/utils/types/status.enum';
import { LoginUserDto } from './dto/login-user.dto';

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
  async login(@Body() loginUserDto: LoginUserDto) {
    return null;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
