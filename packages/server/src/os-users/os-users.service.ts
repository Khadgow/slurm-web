import { Injectable } from '@nestjs/common';
import { CreateOsUserDto } from './dto/create-os-user.dto';
import { UpdateOsUserDto } from './dto/update-os-user.dto';
import { PrismaService } from '../prisma.service';
import { CreateManyOsUsersDto } from './dto/create-many-os-users.dto';
import { OsUserGroupsService } from '../os-user-groups/os-user-groups.service';
import { generate } from 'generate-password';
import { exec } from 'child_process';
import shellExec from 'shell-exec';
import * as process from 'process';

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
    console.log('maxGroupIndexUser', maxGroupIndexUser);

    // const maxGroupIndex = maxGroupIndexUser?.groupIndex || 0;
    const maxGroupIndex = 0;

    const maxId = maxUserId?.id || Number(process.env.OS_USER_START_ID);

    console.log('createManyOsUsersDto', createManyOsUsersDto);
    const createdUsers = [];
    for (let i = 1; i < createManyOsUsersDto.quantity + 1; i++) {
      console.log('i', i);
      const userName = `${group.name}${maxGroupIndex + i}`;
      const userId = maxId + i;
      // const createdUser = await this.prisma.osUser.create({
      //   data: {
      //     id: userId,
      //     groupIndex: maxGroupIndex + i,
      //     name: userName,
      //     groupId: group.id,
      //     password: generate({ length: 10, numbers: true }),
      //   },
      // });
      const addOsUserCommand = `echo "" | sudo -S "useradd -m -u ${userId} ${userName}"`;
      const addAccountCommand = `echo "" | sudo -S "sacctmgr -i add account ${userName}"`;
      const addSlurmUserCommand = `echo "" | sudo -S "sacctmgr -i create user name=${userName} DefaultAccount=${userName}"`;
      shellExec(addOsUserCommand).then(console.log).catch(console.error);
      shellExec(addAccountCommand).then(console.log).catch(console.error);
      shellExec(addSlurmUserCommand).then(console.log).catch(console.error);

      console.log('=============SUCCESS+++++++++');
      // createdUsers.push(createdUser);
    }
    return createdUsers;
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
