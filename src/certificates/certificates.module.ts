import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificateService } from "./services/certificates.service";
import { CertificateController } from "./services/https/controllers/certificate.controller";
import { Module } from '@nestjs/common';
import { CertificateEntity } from "./entities/certificate.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CertificateEntity])],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: []
})
export class CertificateModule {}