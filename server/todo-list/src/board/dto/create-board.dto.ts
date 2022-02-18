import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  date: string; //YYYYMMDD

  @IsNumber()
  @IsNotEmpty()
  id: number; //계정의 고유 ID
}
