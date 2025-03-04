import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CertificateModule } from '~certificates/certificates.module';
import { databaseConfig } from '~config/database.config';
import { UserModule } from '~users/user.module';

@Module({
  imports: [CertificateModule, UserModule,databaseConfig],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
