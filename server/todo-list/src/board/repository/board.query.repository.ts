import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

@EntityRepository(Board)
export class BoardQueryRepository extends Repository<Board> {
  /**
   * 모든 게시글을 조회함
   * @param options
   * @returns
   */
  async getAllBoards(options: FindManyOptions) {
    const result = await this.find(options);

    return result;
  }
}
