import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CertificateService } from '~certificates/services/certificates.service';
import { IssueCertificateDto } from '../dto/certificate.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CertificateTypeResponse } from '../responses/certificate-type.response';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { DeleteResult } from 'typeorm';
import { SuccessResponse } from '~core/http/responses/success.response';
import { CreateCertificateTypeDto } from '../dto/create-certificate-type.dto';
import { CertificateResponse } from '../responses/certificate.response';
import { TeacherCertificateDto } from '../dto/teacher-certificate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('/teacherCertificate111/all')
  @ApiOperation({ description: `Get all teacher certificate` })
  @ApiOkResponse({ type: [CertificateResponse] })
  async getTeacherCertificate() {
    return this.certificateService.getTeacherCertificateType();
  }

  @Post('teacherCertificate/create')
  @ApiOperation({ description: `Create table certificate and teacher` })
  @ApiOkResponse({ type: CertificateResponse })
  @ApiBody({ type: TeacherCertificateDto })
  @HttpCode(HttpStatus.CREATED)
  createTeacherCertificate(@Body() teacherCertificateDto: TeacherCertificateDto): Promise<any> {
    return this.certificateService.createTeacherCertificate(teacherCertificateDto);
  }

  @Get('teacherCertificate/:certificateTypeId')
  @ApiOperation({ description: `Get all teacher certificate` })
  @ApiOkResponse({ type: [CertificateResponse] })
  async getTeacherCertificateDetail(@Param('certificateTypeId') certificateTypeId: string) {
    return this.certificateService.getTeacherCertificateTypeDetail(certificateTypeId);
  }

  @Get('type/all')
  @ApiOkResponse({ type: [CertificateTypeResponse] })
  async getCertificate() {
    return this.certificateService.getAllCertificateType();
  }

  @Post('type/create')
  @ApiOperation({ description: `Create certificate type` })
  @ApiOkResponse({ type: CertificateTypeResponse })
  @HttpCode(HttpStatus.CREATED)
  createType(@Body() createCertificateTypeDto: CreateCertificateTypeDto): Promise<CertificateTypeResponse> {
      return this.certificateService.createCertificateType(createCertificateTypeDto)
  }


  @Delete('type/:id')
  @ApiOperation({ description: `Delete certificate` })
  @ApiOkResponse({ type: SuccessResponse })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string): Promise<SuccessResponse> {
      return this.certificateService.deleteCertificateType(id)
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

    @Get('student/:studentId')
    @ApiOperation({ description: `Get all certificates of student` })
    @ApiOkResponse({ type: [CertificateResponse] })
    @ApiParam({ name: 'studentId', type: String, description: 'Student ID' })
    async getCertificateByStudentId(@Param('studentId') studentId: string) {
      return this.certificateService.getCertificateByStudentId(studentId);
    }
  
    @Get('teacher/:teacherId')
    @ApiOperation({ description: `Get all certificates of teacher` })
    @ApiOkResponse({ type: [CertificateResponse] })
    @ApiParam({ name: 'teacherId', type: String, description: 'Teacher ID' })
    async getCertificateByTeacherId(@Param('teacherId') teacherId: string) {
      return this.certificateService.getCertificateByTeacherId(teacherId);
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

    @Post('uploadImage')
    @ApiOperation({ description: `Upload an image file` })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Lưu vào thư mục uploads
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { filePath: `/uploads/${file.filename}` };
    }

    @Get('all')
    @ApiOperation({ description: `Get all details certificates` })
    @ApiOkResponse({ type: [CertificateResponse] })
    async getAllCertificate() {
      return this.certificateService.getAllCertificate();
    }
  
    @Get(':id')
    @ApiOperation({ description: `Get details certificates` })
    @ApiOkResponse({ type: CertificateResponse })
    @ApiParam({ name: 'id', type: String, description: 'Certificate ID' })
    async getCertificateById(@Param('id') id: string) {
      return this.certificateService.getCertificateById(id);
    }

    @Post(':id')
    @ApiParam({ name: 'id', type: String, description: 'User ID' })
    @ApiBody({ type: IssueCertificateDto })
    async issueCertificate(
        @Param('id') userId: string, 
        @Body() data: { certificateId: string, name: string; code: string; subject: string; }
    ) {
        return this.certificateService.issueCertificate(data.certificateId, userId, data.name, data.code, data.subject);
    }
}
