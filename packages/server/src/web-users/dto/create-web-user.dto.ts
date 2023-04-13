import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWebUserDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
