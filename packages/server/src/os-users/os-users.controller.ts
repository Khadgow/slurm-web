import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OsUsersService } from './os-users.service';
import { CreateOsUserDto } from './dto/create-os-user.dto';
import { UpdateOsUserDto } from './dto/update-os-user.dto';
import { CreateManyOsUsersDto } from './dto/create-many-os-users.dto';
import { DeleteManyOsUsersDto } from './dto/delete-many-os-users.dto';
import { CopyManyDirectoriesDto } from './dto/copy-many-directories.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@ApiTags('Пользователи ОС')
@Controller('os-users')
@UseGuards(JwtAuthGuard)
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

  @Post('/delete-many')
  deleteMany(@Body() deleteManyOsUsersDto: DeleteManyOsUsersDto) {
    return this.osUsersService.deleteMany(deleteManyOsUsersDto);
  }

  @Post('/copy-many-directories')
  copyManyDirectories(@Body() copyManyDirectoriesDto: CopyManyDirectoriesDto) {
    return this.osUsersService.copyManyDirectories(copyManyDirectoriesDto);
  }

  @Get()
  findAll() {
    return this.osUsersService.findAll();
  }

  @Post('/copy/:id')
  copyDirectory(@Param('id') id: string) {
    return this.osUsersService.copyDirectory(+id);
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
