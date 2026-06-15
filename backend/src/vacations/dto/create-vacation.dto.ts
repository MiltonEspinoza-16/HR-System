import {
  IsNumber,
  IsString
} from 'class-validator'

export class CreateVacationDto {

  @IsNumber()
  employee_id!: number

  @IsString()
  fecha_inicio!: string

  @IsString()
  fecha_fin!: string

  @IsString()
  estado!: string

}
