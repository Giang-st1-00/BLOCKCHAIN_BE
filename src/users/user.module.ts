import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '~users/services/user.service';
import { UserController } from '~users/http/controllers/user.controller';
import { UserEntity } from '~users/entities/user.entity';
import { UserCertificateEntity } from './entities/user-certificate.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserCertificateEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
