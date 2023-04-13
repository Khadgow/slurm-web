import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyOsUsersDto {
  @IsString()
  @ApiProperty()
  groupName: string;
  @IsNumber()
  @ApiProperty()
  quantity: number;
}
