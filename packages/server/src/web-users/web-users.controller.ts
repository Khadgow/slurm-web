import { Controller, Get, Headers } from '@nestjs/common';
import { WebUsersService } from './web-users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('web-users')
export class WebUsersController {
  constructor(private readonly webUsersService: WebUsersService) {}

  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiResponse({ status: 200 })
  // @Roles('USER')
  // @UseGuards(RolesGuard)
  @Get('me')
  getMe(@Headers() headers) {
    return this.webUsersService.getMe(headers.authorization);
  }
}
