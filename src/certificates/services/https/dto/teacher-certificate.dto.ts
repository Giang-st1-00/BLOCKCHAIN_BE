import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsUUID, ArrayNotEmpty } from 'class-validator';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';

export class TeacherCertificateDto {
  @ApiPropertyOptional({ example: "909f6672-fa26-4210-9399-8f9e5baa200c" })
  @IsOptional()
  @IsString({ each: true })
  certificateId: string;

  @ApiPropertyOptional({ example: "909f6672-fa26-4210-9399-8f9e5baa200c" })
  @IsOptional()
  @IsString({ each: true })
  userId: string;
}
