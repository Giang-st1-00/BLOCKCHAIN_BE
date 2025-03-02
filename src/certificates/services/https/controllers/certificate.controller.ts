import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CertificateService } from '~certificates/services/certificates.service';
import { IssueCertificateDto } from './dto/certificate.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post('issue')
  @ApiBody({ type: IssueCertificateDto })
  async issueCertificate(@Body() data: { name: string; score: number; recipient: string }) {
    return this.certificateService.issueCertificate(data.name, data.score, data.recipient);
  }

  @Get('verify/:certId')
  async verifyCertificate(@Param('certId') certId: string) {
    return this.certificateService.verifyCertificate(certId);
  }
}
