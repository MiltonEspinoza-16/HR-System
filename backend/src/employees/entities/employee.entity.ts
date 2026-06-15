import {
Entity,
PrimaryGeneratedColumn,
Column
} from 'typeorm'

@Entity('employees')
export class Employee {

@PrimaryGeneratedColumn()
id!: number

@Column({
unique: true,
nullable: true
})
codigo!: string

@Column()
ci!: string

@Column()
nombre!: string

@Column({
nullable: true
})
telefono!: string

@Column({
nullable: true
})
correo!: string

@Column({
nullable: true
})
direccion!: string

@Column({
nullable: true
})
fecha_nacimiento!: string

@Column()
cargo!: string

@Column()
departamento!: string

@Column({
nullable: true
})
fecha_contratacion!: string

@Column({
nullable: true
})
tipo_contrato!: string

@Column('decimal')
salario!: number

@Column({
default: true
})
estado!: boolean

}
