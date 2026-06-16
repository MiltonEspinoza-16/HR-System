import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';
import {
  IsOptional,
  IsNumber
} from 'class-validator';
export class CreateUserDto {
  
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  @IsIn([
    'ADMIN',
    'RRHH',
    'JEFE',
    'EMPLEADO'
  ])
  rol!: string;
  
  @IsOptional()
  employee_id!: number;
}