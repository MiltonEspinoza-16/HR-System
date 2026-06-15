import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Permission } from './entities/permission.entity'

import { CreatePermissionDto } from './dto/create-permission.dto'

import { UpdatePermissionDto } from './dto/update-permission.dto'

@Injectable()
export class PermissionsService {

  constructor(

    @InjectRepository(Permission)

    private permissionRepository:
      Repository<Permission>,

  ) {}

  create(
    createPermissionDto: CreatePermissionDto,
  ) {

    const permission =
      this.permissionRepository.create(
        createPermissionDto
      )

    return this.permissionRepository.save(
      permission
    )

  }

  findAll() {

    return this.permissionRepository.find({

      relations: {
        employee: true
      }

    })

  }

  findOne(id: number) {

    return this.permissionRepository.findOne({

      where: { id },

      relations: {
        employee: true
      }

    })

  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ) {

    await this.permissionRepository.update(
      id,
      updatePermissionDto
    )

    return this.findOne(id)

  }

  async remove(id: number) {

    await this.permissionRepository.delete(id)

    return {
      message: 'Permiso eliminado'
    }

  }

}