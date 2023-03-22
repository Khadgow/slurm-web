import { forwardRef, Module } from '@nestjs/common';
import { WebUsersService } from './web-users.service';
import { PrismaService } from '../prisma.service';
import { WebUsersController } from './web-users.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [WebUsersController],
  providers: [WebUsersService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
  exports: [WebUsersService],
})
export class WebUsersModule {}
