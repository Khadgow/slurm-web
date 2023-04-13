import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOsUserGroupDto {
  @IsString()
  @ApiProperty()
  name: string;
}
