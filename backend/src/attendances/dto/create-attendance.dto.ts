import {
  IsNumber,
  IsString
} from 'class-validator'

export class CreateAttendanceDto {

  @IsNumber()
  employee_id!: number

  @IsString()
  fecha!: string

  @IsString()
  hora_entrada!: string

  @IsString()
  hora_salida!: string

  @IsString()
  estado!: string

}
