import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { CertificateService } from '~certificates/services/certificates.service';
import { IssueCertificateDto } from '../dto/certificate.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CertificateTypeResponse } from '../responses/certificate-type.response';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { DeleteResult } from 'typeorm';
import { SuccessResponse } from '~core/http/responses/success.response';
import { CreateCertificateTypeDto } from '../dto/create-certificate-type.dto';
import { CertificateResponse } from '../responses/certificate.response';
import { TeacherCertificateDto } from '../dto/teacher-certificate.dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post(':id')
@ApiParam({ name: 'id', type: String, description: 'User ID' })
@ApiBody({ type: IssueCertificateDto })
async issueCertificate(
    @Param('id') userId: string, 
    @Body() data: { certificateId: string, name: string; code: string; subject: string; }
) {
    return this.certificateService.issueCertificate(data.certificateId, userId, data.name, data.code, data.subject);
}


  @Get('studentByType/:certificateTypeId')
  @ApiOperation({ description: `Get all student in certificate` })
  @ApiOkResponse({ type: [CertificateResponse] })
  @ApiParam({ name: 'certificateTypeId', type: String, description: 'Certificate Type' })
  async getStudentByType(@Param('certificateTypeId') certificateTypeId: string) {
    return this.certificateService.getStudentByType(certificateTypeId);
  }

  @Get('verify/:certId')
  async verifyCertificate(@Param('certId') certId: string) {
    return this.certificateService.verifyCertificate(certId);
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ description: `Get all certificates of teacher` })
  @ApiOkResponse({ type: [CertificateResponse] })
  @ApiParam({ name: 'teacherId', type: String, description: 'Teacher ID' })
  async getCertificateByTeacherId(@Param('teacherId') teacherId: string) {
    return this.certificateService.getCertificateByTeacherId(teacherId);
  }

  @Get('student/:studentId')
  @ApiOperation({ description: `Get all certificates of student` })
  @ApiOkResponse({ type: [CertificateResponse] })
  @ApiParam({ name: 'studentId', type: String, description: 'Student ID' })
  async getCertificateByStudentId(@Param('studentId') studentId: string) {
    return this.certificateService.getCertificateByStudentId(studentId);
  }

  // @Get('admin/:adminId')
  // @ApiOperation({ description: `Get all certificates` })
  // @ApiOkResponse({ type: [CertificateResponse] })
  // @ApiParam({ name: 'adminId', type: String, description: 'Student ID' })
  // async getCertificateByStudentId(@Param('adminId') adminId: string) {
  //   return this.certificateService.getCertificateByStudentId(adminId);
  // }

  @Get('teacherCertificate')
  @ApiOperation({ description: `Get all teacher certificate` })
  @ApiOkResponse({ type: [CertificateResponse] })
  async getTeacherCertificate() {
    return this.certificateService.getTeacherCertificateType();
  }

  @Get('teacherCertificate/:certificateTypeId')
  @ApiOperation({ description: `Get all teacher certificate` })
  @ApiOkResponse({ type: [CertificateResponse] })
  async getTeacherCertificateDetail(@Param('certificateTypeId') certificateTypeId: string) {
    return this.certificateService.getTeacherCertificateTypeDetail(certificateTypeId);
  }

  @Post('teacherCertificate')
  @ApiOperation({ description: `Create table certificate and teacher` })
  @ApiOkResponse({ type: CertificateResponse })
  @ApiBody({ type: TeacherCertificateDto })
  @HttpCode(HttpStatus.CREATED)
  createTeacherCertificate(@Body() teacherCertificateDto: TeacherCertificateDto): Promise<any> {
    return this.certificateService.createTeacherCertificate(teacherCertificateDto);
  }

  @Post('teacher/:teacherId')
  @ApiOperation({ description: `Create certificate` })
  @ApiOkResponse({ type: CertificateTypeResponse })
  @ApiParam({ name: 'teacherId', type: String, description: 'Teacher ID' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('teacherId') teacherId: string, 
    @Body() createCertificateDto: CreateCertificateDto
  ): Promise<CertificateResponse> {
    return this.certificateService.createCertificate(teacherId, createCertificateDto);
  }

  @Get('/type/all')
  @ApiOkResponse({ type: [CertificateTypeResponse] })
  async getCertificate() {
    return this.certificateService.getAllCertificateType();
  }

  @Post('/type')
  @ApiOperation({ description: `Create certificate type` })
  @ApiOkResponse({ type: CertificateTypeResponse })
  @HttpCode(HttpStatus.CREATED)
  createType(@Body() createCertificateTypeDto: CreateCertificateTypeDto): Promise<CertificateTypeResponse> {
      return this.certificateService.createCertificateType(createCertificateTypeDto)
  }

  @Delete('/type/:id')
  @ApiOperation({ description: `Delete certificate` })
  @ApiOkResponse({ type: SuccessResponse })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string): Promise<SuccessResponse> {
      return this.certificateService.deleteCertificateType(id)
  }

  // @Get('/all')
  // @ApiOperation({ description: `Get all users` })
  // @ApiOkResponse({ type: , isArray: true })
  // @HttpCode(HttpStatus.OK)
  // async getCertificateByName() {
  //   return this.certificateService.getCertificates();
  // }
  

}
