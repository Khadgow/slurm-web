import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteManyOsUsersDto {
  @IsNumber()
  @ApiProperty()
  groupId: number;

  @IsNumber()
  @ApiProperty()
  startIndex: number;

  @IsNumber()
  @ApiProperty()
  endIndex: number;
}
