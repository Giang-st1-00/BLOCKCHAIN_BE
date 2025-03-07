import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CertificateService } from '~certificates/services/certificates.service';
import { IssueCertificateDto } from '../dto/certificate.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post('issue')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: IssueCertificateDto })
  async issueCertificate(
    @Param('id') userId: string, 
    @Body() data: { name: string; score: number; recipient: string }
  ) {
    return this.certificateService.issueCertificate(userId, data.name, data.score, data.recipient);
  }

  @Get('verify/:certId')
  async verifyCertificate(@Param('certId') certId: string) {
    return this.certificateService.verifyCertificate(certId);
  }
}
