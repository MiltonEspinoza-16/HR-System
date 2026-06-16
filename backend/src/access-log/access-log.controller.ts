import {
  Controller,
  Get,
  Post,
  Body
} from '@nestjs/common';

import { AccessLogService } from './access-log.service';

import { CreateAccessLogDto } from './dto/create-access-log.dto';

@Controller('access-logs')
export class AccessLogController {

  constructor(
    private readonly service:
      AccessLogService
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateAccessLogDto
  ) {

    return this.service.create(dto)

  }

  @Get()
  findAll() {

    return this.service.findAll()

  }

}