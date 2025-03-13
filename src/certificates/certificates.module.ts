import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificateService } from "./services/certificates.service";
import { CertificateController } from "./services/https/controllers/certificate.controller";
import { Module } from '@nestjs/common';
import { CertificateEntity } from "./entities/certificate.entity";
import { UserEntity } from "~users/entities/user.entity";
import { UserService } from "~users/services/user.service";
import { CertificateTypeEntity } from "./entities/certificate-type.entity";
import { UserCertificateEntity } from "~users/entities/user-certificate.entity";
import { UserCertificateTypeEntity } from "~users/entities/user-certificate-type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity, UserEntity, CertificateTypeEntity, UserCertificateEntity, UserCertificateTypeEntity])],
    controllers: [CertificateController],
    providers: [CertificateService, UserService],
    exports: []
})
export class CertificateModule {}