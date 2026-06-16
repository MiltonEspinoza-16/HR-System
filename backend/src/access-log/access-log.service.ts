import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AccessLog } from './entities/access-log.entity';

import { CreateAccessLogDto } from './dto/create-access-log.dto';

@Injectable()
export class AccessLogService {

  constructor(

    @InjectRepository(AccessLog)

    private repository:
      Repository<AccessLog>

  ) {}

  create(
    dto: CreateAccessLogDto
  ) {

    const log =
      this.repository.create(dto)

    return this.repository.save(log)

  }

  findAll() {

    return this.repository.find({

      order: {
        fecha_hora: 'DESC'
      }

    })

  }

}