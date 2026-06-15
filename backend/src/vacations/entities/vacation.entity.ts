import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Employee } from '../../employees/entities/employee.entity'

@Entity('vacations')
export class Vacation {

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

  @Column()
  fecha_inicio!: string

  @Column()
  fecha_fin!: string

  @Column({
    default: 'PENDIENTE'
  })
  estado!: string

}
