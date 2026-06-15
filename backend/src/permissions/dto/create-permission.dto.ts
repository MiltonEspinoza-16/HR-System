import {
  IsNumber,
  IsString
} from 'class-validator'

export class CreatePermissionDto {

  @IsNumber()
  employee_id!: number

  @IsString()
  motivo!: string

  @IsString()
  fecha_inicio!: string

  @IsString()
  fecha_fin!: string

  @IsString()
  estado!: string

}
