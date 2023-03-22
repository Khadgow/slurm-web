import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OsUsersService } from './os-users.service';
import { CreateOsUserDto } from './dto/create-os-user.dto';
import { UpdateOsUserDto } from './dto/update-os-user.dto';
import { CreateManyOsUsersDto } from './dto/create-many-os-users.dto';

@Controller('os-users')
export class OsUsersController {
  constructor(private readonly osUsersService: OsUsersService) {}

  @Post()
  create(@Body() createOsUserDto: CreateOsUserDto) {
    return this.osUsersService.create(createOsUserDto);
  }

  @Post('/create-many')
  createMany(@Body() createManyOsUsersDto: CreateManyOsUsersDto) {
    return this.osUsersService.createMany(createManyOsUsersDto);
  }

  @Get()
  findAll() {
    return this.osUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.osUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOsUserDto: UpdateOsUserDto) {
    return this.osUsersService.update(+id, updateOsUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.osUsersService.remove(+id);
  }
}
