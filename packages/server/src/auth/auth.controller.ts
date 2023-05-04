import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from 'auth/dto/login.dto';
import { CreateWebUserDto } from '../web-users/dto/create-web-user.dto';

@ApiTags('Авторизация')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('/register')
  // registration(@Body() userDto: CreateWebUserDto) {
  //   return this.authService.registration(userDto);
  // }
}
