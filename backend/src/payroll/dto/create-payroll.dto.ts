import {
  IsNumber,
  IsString
} from 'class-validator'

export class CreatePayrollDto {

  @IsNumber()
  employee_id!: number

  @IsNumber()
  salario_base!: number

  @IsNumber()
  bono!: number

  @IsNumber()
  descuento!: number

  @IsString()
  fecha_pago!: string

}