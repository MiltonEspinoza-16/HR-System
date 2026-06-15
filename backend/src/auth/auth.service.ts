import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(
    username: string,
    password: string,
  ) {

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado',
      };
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!passwordMatch) {
      return {
        success: false,
        message: 'Contraseña incorrecta',
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        rol: user.rol,
      },
    };
  }
}