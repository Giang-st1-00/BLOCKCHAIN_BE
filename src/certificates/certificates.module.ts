import { CertificateService } from "./services/certificates.service";
import { CertificateController } from "./services/https/controllers/certificate.controller";
import { forwardRef, Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: []
})
export class ChannelModule {}