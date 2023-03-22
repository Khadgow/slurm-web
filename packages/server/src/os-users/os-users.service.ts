import { Injectable } from '@nestjs/common';
import { CreateOsUserDto } from './dto/create-os-user.dto';
import { UpdateOsUserDto } from './dto/update-os-user.dto';
import { PrismaService } from '../prisma.service';
import { CreateManyOsUsersDto } from './dto/create-many-os-users.dto';
import { OsUserGroupsService } from '../os-user-groups/os-user-groups.service';
import { generate } from 'generate-password';

@Injectable()
export class OsUsersService {
  constructor(
    private prisma: PrismaService,
    private osUserGroupsService: OsUserGroupsService,
  ) {}

  create(createOsUserDto: CreateOsUserDto) {
    return this.prisma.osUser.create({ data: createOsUserDto });
  }

  async createMany(createManyOsUsersDto: CreateManyOsUsersDto) {
    const group = await this.osUserGroupsService.findByNameOrCreate(
      createManyOsUsersDto.groupName,
    );

    const maxGroupIndexUser = await this.prisma.osUser.findFirst({
      where: { groupId: group.id },
      orderBy: {
        groupIndex: 'desc',
      },
    });

    const maxUserId = await this.prisma.osUser.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
    const maxGroupIndex = maxGroupIndexUser.groupIndex || 0;

    const maxId = maxUserId.id || 1002;

    for (let i = 1; i < createManyOsUsersDto.quantity + 1; i++) {
      this.prisma.osUser.create({
        data: {
          id: maxId + i,
          groupIndex: maxGroupIndex + i,
          name: `${group.name}${maxGroupIndexUser.groupIndex + i}`,
          groupId: group.id,
          password: generate({ length: 10, numbers: true }),
        },
      });
    }
  }

  findAll() {
    return this.prisma.osUser.findMany();
  }

  findOne(id: number) {
    return this.prisma.osUser.findUnique({ where: { id } });
  }

  update(id: number, updateOsUserDto: UpdateOsUserDto) {
    return this.prisma.osUser.update({ data: updateOsUserDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.osUser.delete({ where: { id } });
  }
}
