import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Employee } from '../../employees/entities/employee.entity'

@Entity('permissions')
export class Permission {

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
  motivo!: string

  @Column()
  fecha_inicio!: string

  @Column()
  fecha_fin!: string

  @Column()
  estado!: string

}