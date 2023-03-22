import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OsUserGroupsService } from './os-user-groups.service';
import { CreateOsUserGroupDto } from './dto/create-os-user-group.dto';
import { UpdateOsUserGroupDto } from './dto/update-os-user-group.dto';

@Controller('os-user-groups')
export class OsUserGroupsController {
  constructor(private readonly osUserGroupsService: OsUserGroupsService) {}

  @Post()
  create(@Body() createOsUserGroupDto: CreateOsUserGroupDto) {
    return this.osUserGroupsService.create(createOsUserGroupDto);
  }

  @Get()
  findAll() {
    return this.osUserGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.osUserGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOsUserGroupDto: UpdateOsUserGroupDto,
  ) {
    return this.osUserGroupsService.update(+id, updateOsUserGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.osUserGroupsService.remove(+id);
  }
}
