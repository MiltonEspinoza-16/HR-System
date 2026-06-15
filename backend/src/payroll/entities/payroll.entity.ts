import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Employee } from '../../employees/entities/employee.entity'

@Entity('payrolls')
export class Payroll {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  employee_id!: number

  @ManyToOne(
    () => Employee
  )
  @JoinColumn({
    name: 'employee_id'
  })
  employee!: Employee

  @Column('decimal')
  salario_base!: number

  @Column('decimal')
  bono!: number

  @Column('decimal')
  descuento!: number

  @Column('decimal')
  total!: number

  @Column()
  fecha_pago!: string

}