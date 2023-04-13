import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CopyManyDirectoriesDto {
  @IsNumber()
  @ApiProperty()
  groupId: number;
}
