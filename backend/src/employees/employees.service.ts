import {
  Injectable,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Employee } from './entities/employee.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

async create(
  createEmployeeDto: CreateEmployeeDto,
) {

  const existeCI =
    await this.employeeRepository.findOne({

      where: {
        ci: createEmployeeDto.ci
      }

    });

  if (existeCI) {

    throw new BadRequestException(
      'Ya existe un empleado con ese CI'
    );

  }

  const existeNombre =
    await this.employeeRepository.findOne({

      where: {
        nombre: createEmployeeDto.nombre
      }

    });

  if (existeNombre) {

    throw new BadRequestException(
      'Ya existe un empleado con ese nombre'
    );

  }

  const employee =
    this.employeeRepository.create(
      createEmployeeDto,
    );

  const savedEmployee =
    await this.employeeRepository.save(
      employee,
    );

  const codigo =
    `EMP-${String(savedEmployee.id)
      .padStart(3, '0')}`;

  await this.employeeRepository.update(
    savedEmployee.id,
    {
      codigo
    }
  );

  return this.findOne(
    savedEmployee.id
  );

}


  /*
   * CÓDIGO ORIGINAL
   * ----------------
   * Mostraba todos los empleados sin filtrar.
   *
   * findAll() {
   *   return this.employeeRepository.find();
   * }
   */

  /*
   * ELIMINACIÓN LÓGICA
   * ------------------
   * Solo mostramos empleados activos.
   * Los empleados con estado = false
   * quedan ocultos del sistema.
   */
  findAll() {

    return this.employeeRepository.find({

      where: {
        estado: true
      }

    });

  }

  /*
   * Muestra empleados inactivos
   * (eliminados lógicamente).
   */
  findInactive() {

    return this.employeeRepository.find({

      where: {
        estado: false
      }

    });

  }

  findOne(id: number) {

    return this.employeeRepository.findOne({
      where: { id },
    });

  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {

    await this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );

    return this.findOne(id);

  }

  /*
   * CÓDIGO ORIGINAL
   * ----------------
   * Eliminación física.
   * El registro desaparecía completamente
   * de la base de datos.
   *
   * async remove(id: number) {
   *
   *   await this.employeeRepository.delete(id);
   *
   *   return {
   *     message: 'Empleado eliminado',
   *   };
   *
   * }
   */

  /*
   * ELIMINACIÓN LÓGICA
   * ------------------
   * En lugar de borrar el registro,
   * cambiamos estado = false.
   *
   * El empleado:
   * - Desaparece del Front.
   * - Desaparece de GET /employees.
   * - Sigue existiendo en MySQL.
   * - Conserva vacaciones, planillas,
   *   asistencias y permisos.
   */
  async remove(id: number) {

    await this.employeeRepository.update(
      id,
      {
        estado: false
      }
    );

    return {
      message: 'Empleado desactivado',
    };

  }

  /*
   * RESTAURAR EMPLEADO
   * ------------------
   * Vuelve a activar un empleado
   * previamente desactivado.
   */
  async restore(id: number) {

    await this.employeeRepository.update(
      id,
      {
        estado: true
      }
    );

    return {
      message: 'Empleado restaurado'
    };

  }

}