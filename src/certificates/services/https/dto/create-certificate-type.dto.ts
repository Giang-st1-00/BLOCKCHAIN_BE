import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';

export class CreateCertificateTypeDto {
  @ApiProperty({ example: "JLPT" })
  @IsString()
  name: string;
}
