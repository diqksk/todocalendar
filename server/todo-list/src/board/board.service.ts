import { Injectable } from '@nestjs/common';
import { ResponseError } from 'src/commons/utils/error/custom.error';
import { ErrorStatus } from 'src/commons/utils/types/status.enum';
import { Between, FindManyOptions } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardMutationRepository } from './repository/board.mutation.repository';
import { BoardQueryRepository } from './repository/board.query.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardQueryRepository: BoardQueryRepository,
    private readonly boardMutationRepository: BoardMutationRepository,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    try {
      const board = await this.boardMutationRepository.createBoard(
        createBoardDto,
      );

      return board;
    } catch (e) {
      throw new ResponseError(
        ErrorStatus.BAD_REQUEST,
        '(서버에러) 게시글을 등록할 수 없습니다',
      );
    }
  }

  async findAll(date: string): Promise<Board[]> {
    const options: FindManyOptions<Board> = {
      where: { date },
    };
    const allBoards = await this.boardQueryRepository.getAllBoards(options);

    return allBoards;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
