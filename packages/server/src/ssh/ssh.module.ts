import { Module } from '@nestjs/common';
import { SshService } from './ssh.service';
import { SshGateway } from './ssh.gateway';
import { AuthModule } from 'auth/auth.module';

@Module({
  providers: [SshGateway, SshService],
  imports: [AuthModule],
})
export class SshModule {}
