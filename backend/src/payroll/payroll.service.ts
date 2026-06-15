import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Payroll } from './entities/payroll.entity'

import { CreatePayrollDto } from './dto/create-payroll.dto'

import { UpdatePayrollDto } from './dto/update-payroll.dto'

@Injectable()
export class PayrollService {

  constructor(
    @InjectRepository(Payroll)
    private payrollRepository:
      Repository<Payroll>,
  ) {}

  create(
    createPayrollDto: CreatePayrollDto,
  ) {

    const total =

      Number(
        createPayrollDto.salario_base
      )

      +

      Number(
        createPayrollDto.bono
      )

      -

      Number(
        createPayrollDto.descuento
      )

    const payroll =
      this.payrollRepository.create({

        ...createPayrollDto,

        total

      })

    return this.payrollRepository.save(
      payroll
    )
  }

  findAll() {

    return this.payrollRepository.find({

      relations: {
        employee: true
      }

    })

  }

  findOne(id: number) {

    return this.payrollRepository.findOne({

      where: { id },

      relations: {
        employee: true
      }

    })

  }

  async update(
    id: number,
    updatePayrollDto: UpdatePayrollDto,
  ) {

    const total =

      Number(
        updatePayrollDto.salario_base || 0
      )

      +

      Number(
        updatePayrollDto.bono || 0
      )

      -

      Number(
        updatePayrollDto.descuento || 0
      )

    await this.payrollRepository.update(
      id,
      {
        ...updatePayrollDto,
        total
      }
    )

    return this.findOne(id)

  }

  async remove(id: number) {

    await this.payrollRepository.delete(id)

    return {
      message:
        'Planilla eliminada'
    }

  }

}