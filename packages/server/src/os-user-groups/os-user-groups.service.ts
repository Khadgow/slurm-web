import { Injectable } from '@nestjs/common';
import { CreateOsUserGroupDto } from './dto/create-os-user-group.dto';
import { UpdateOsUserGroupDto } from './dto/update-os-user-group.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OsUserGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createOsUserGroupDto: CreateOsUserGroupDto) {
    return this.prisma.osUserGroup.create({ data: createOsUserGroupDto });
  }

  findAll() {
    return this.prisma.osUserGroup.findMany({
      include: { users: true },
      where: {
        NOT: [
          {
            users: {
              none: {},
            },
          },
        ],
      },
    });
  }

  findOne(id: number) {
    return this.prisma.osUserGroup.findUnique({
      where: { id },
      include: { users: true },
    });
  }

  findByNameOrCreate(name: string) {
    return this.prisma.osUserGroup.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  update(id: number, updateOsUserGroupDto: UpdateOsUserGroupDto) {
    return this.prisma.osUserGroup.update({
      where: { id },
      data: updateOsUserGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.osUserGroup.delete({ where: { id } });
  }
}
