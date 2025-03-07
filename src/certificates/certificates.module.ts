import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificateService } from "./services/certificates.service";
import { CertificateController } from "./services/https/controllers/certificate.controller";
import { Module } from '@nestjs/common';
import { CertificateEntity } from "./entities/certificate.entity";
import { UserEntity } from "~users/entities/user.entity";
import { UserService } from "~users/services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity, UserEntity])],
    controllers: [CertificateController],
    providers: [CertificateService, UserService],
    exports: []
})
export class CertificateModule {}