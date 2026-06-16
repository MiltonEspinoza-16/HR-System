import {
  IsNumber,
  IsString,
  IsOptional
} from 'class-validator';

export class CreateAttendanceDto {

  @IsNumber()
  employee_id!: number;

  @IsString()
  fecha!: string;

  @IsString()
  hora_entrada!: string;

  @IsOptional()
  @IsString()
  hora_salida?: string;

  @IsString()
  estado!: string;

  @IsOptional()
  @IsString()
  latitud?: string

  @IsOptional()
  @IsString()
  longitud?: string

}