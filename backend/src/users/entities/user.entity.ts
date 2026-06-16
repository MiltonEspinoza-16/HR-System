import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  
  

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  nombre!: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'RRHH', 'JEFE', 'EMPLEADO'],
  })
  rol!: string;
  
  @Column({
  nullable: true
  })
  employee_id!: number;

  @Column({
    default: true,
  })
  estado!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}