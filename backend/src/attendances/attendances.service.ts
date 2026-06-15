import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Attendance } from './entities/attendance.entity'

import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'

@Injectable()
export class AttendancesService {
constructor(
  @InjectRepository(Attendance)
  private attendanceRepository: Repository<Attendance>,
) {}
  
  create(
  createAttendanceDto: CreateAttendanceDto,
) {

  const attendance =
    this.attendanceRepository.create(
      createAttendanceDto
    )

  return this.attendanceRepository.save(
    attendance
  )

}

findAll() {

  return this.attendanceRepository.find({
    relations: {
      employee: true
    }
  })

}

findOne(id: number) {

  return this.attendanceRepository.findOne({
    where: { id },
    relations: {
      employee: true
    }
  })

}

async update(
  id: number,
  updateAttendanceDto: UpdateAttendanceDto,
) {

  await this.attendanceRepository.update(
    id,
    updateAttendanceDto
  )

  return this.findOne(id)

}

async remove(id: number) {

  await this.attendanceRepository.delete(id)

  return {
    message: 'Asistencia eliminada'
  }

}
}
