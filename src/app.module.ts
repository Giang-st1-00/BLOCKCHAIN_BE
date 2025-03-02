import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChannelModule } from '~certificates/certificates.module';

@Module({
  imports: [ChannelModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
