import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Employee } from '../../employees/entities/employee.entity'

@Entity('attendances')
export class Attendance {

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
  fecha!: string

  @Column()
  hora_entrada!: string

  @Column({
  nullable: true
  })
  hora_salida!: string
  

  @Column()
  estado!: string

  @Column({
  nullable: true
  })
  latitud!: string

  @Column({
    nullable: true
  })
  longitud!: string

}
