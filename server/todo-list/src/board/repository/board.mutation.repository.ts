import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Board } from '../entities/board.entity';

@EntityRepository(Board)
export class BoardMutationRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const result = await this.save(createBoardDto);
    return result;
  }
}
