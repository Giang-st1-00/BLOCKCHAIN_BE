import { Module } from '@nestjs/common';
import { UserEntity } from '~users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '~users/user.module';
import { AuthService } from '~authentications/services/auth.service';
import { AuthController } from './http/controlllers/auth.controller';
import { jwtConfig } from '~config/jwt.config';

@Module({
    imports: [jwtConfig, UserModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService ],
    exports: [AuthService]
})
export class AuthenticationModule {}
