import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  Length,
  Matches
} from 'class-validator'

export class CreateEmployeeDto {

  @IsNotEmpty()
  @Length(5, 20)
  ci!: string

  @IsNotEmpty()
  @Length(3, 100)
  @Matches(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    {
      message:
        'El nombre solo puede contener letras'
    }
  )
  nombre!: string

  @IsNotEmpty()
  @Matches(
    /^[0-9]+$/,
    {
      message:
        'El teléfono solo puede contener números'
    }
  )
  telefono!: string

  @IsNotEmpty()
  @IsEmail()
  correo!: string

  @IsNotEmpty()
  @IsString()
  direccion!: string

  @IsNotEmpty()
  fecha_nacimiento!: string

  @IsNotEmpty()
  @IsString()
  cargo!: string

  @IsNotEmpty()
  @IsString()
  departamento!: string

  @IsNotEmpty()
  fecha_contratacion!: string

  @IsNotEmpty()
  @IsString()
  tipo_contrato!: string

  @IsNumber()
  salario!: number

}