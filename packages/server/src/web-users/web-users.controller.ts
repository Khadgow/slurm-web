import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { WebUsersService } from './web-users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('web-users')
@UseGuards(JwtAuthGuard)
export class WebUsersController {
  constructor(private readonly webUsersService: WebUsersService) {}

  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200 })
  @Get('me')
  getMe(@Headers() headers) {
    return this.webUsersService.getMe(headers.authorization);
  }
}
