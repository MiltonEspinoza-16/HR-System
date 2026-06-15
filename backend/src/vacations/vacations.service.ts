import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Vacation } from './entities/vacation.entity';

import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Injectable()
export class VacationsService {

  constructor(
    @InjectRepository(Vacation)
    private vacationRepository: Repository<Vacation>,
  ) {}

  create(
    createVacationDto: CreateVacationDto,
  ) {

    const vacation =
      this.vacationRepository.create(
        createVacationDto
      )

    return this.vacationRepository.save(
      vacation
    )
  }

  findAll() {

    return this.vacationRepository.find({
    relations: {
      employee: true
    }
    })

  }

  findOne(id: number) {

    return this.vacationRepository.findOne({
      where: { id },
      relations: {
        employee: true
      }
    })

  }

  async update(
    id: number,
    updateVacationDto: UpdateVacationDto,
  ) {

    await this.vacationRepository.update(
      id,
      updateVacationDto
    )

    return this.findOne(id)

  }

  async remove(id: number) {

    await this.vacationRepository.delete(id)

    return {
      message: 'Vacación eliminada'
    }

  }

}