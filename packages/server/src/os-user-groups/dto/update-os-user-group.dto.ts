import { PartialType } from '@nestjs/swagger';
import { CreateOsUserGroupDto } from './create-os-user-group.dto';

export class UpdateOsUserGroupDto extends PartialType(CreateOsUserGroupDto) {}
