import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMutationRepository } from './repository/user.mutation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQueryRepository } from './repository/user.query.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMutationRepository, UserQueryRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
