import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWebUserDto } from './dto/create-web-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebUsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  getUserByName(name: string) {
    return this.prisma.webUser.findFirst({ where: { name } });
  }

  async getMe(token: string) {
    const { name, id } = this.jwtService.verify(token.split(' ')[1]);
    return { name, id };
  }

  createWebUser(dto: CreateWebUserDto) {
    return this.prisma.webUser.create({ data: dto });
  }
}
