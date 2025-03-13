import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsUUID, ArrayNotEmpty } from 'class-validator';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';
interface User {
  id: string;
}

export class CreateCertificateDto {
  @ApiProperty({
      example: CertificateStatusEnum.PENDING
  })
  @IsEnum(CertificateStatusEnum)
  status: CertificateStatusEnum;

  @ApiPropertyOptional({ example: faker.string.uuid() })
  @IsOptional()
  @IsUUID('4')
  certificateTypeId: string;

  @ApiPropertyOptional({ example: [{ id: faker.string.uuid() }] })
  @IsOptional()
  @ArrayNotEmpty()  
  users: User[];
}
