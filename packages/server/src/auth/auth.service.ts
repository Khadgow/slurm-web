import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'auth/dto/login.dto';
import { WebUsersService } from '../web-users/web-users.service';
import { WebUser } from '@prisma/client';
import { CreateWebUserDto } from '../web-users/dto/create-web-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private webUsersService: WebUsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateWebUserDto) {
    const candidate = await this.webUsersService.getUserByName(userDto.name);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.webUsersService.createWebUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: WebUser) {
    const payload = {
      name: user.name,
      id: user.id,
    };
    return {
      user: payload,
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.webUsersService.getUserByName(loginDto.name);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некоррктное имя или пароль',
      });
    }
    const passwordEquals = bcrypt.compare(loginDto.password, user?.password);

    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоррктное имя или пароль',
    });
  }
}
