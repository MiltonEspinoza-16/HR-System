import {
  IsString,
  IsNotEmpty
} from 'class-validator';

export class CreateAccessLogDto {

  @IsString()
  @IsNotEmpty()
  usuario!: string;

  @IsString()
  @IsNotEmpty()
  ip!: string;

  @IsString()
  @IsNotEmpty()
  evento!: string;

  @IsString()
  @IsNotEmpty()
  browser!: string;

}