import { PartialType } from '@nestjs/swagger';
import { CreateOsUserDto } from './create-os-user.dto';

export class UpdateOsUserDto extends PartialType(CreateOsUserDto) {}
