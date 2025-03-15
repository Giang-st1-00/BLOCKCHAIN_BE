import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsUUID, ArrayNotEmpty } from 'class-validator';
import { CertificateStatusEnum } from '~certificates/enums/certificateStatus.enum';
interface User {
  id: string;
  score: number;
  image: string;
}

export class CreateCertificateDto {
  @ApiProperty({
      example: CertificateStatusEnum.PENDING
  })
  @IsEnum(CertificateStatusEnum)
  status: CertificateStatusEnum;

  @ApiProperty({ example: faker.string.uuid() })
  @IsOptional()
  @IsUUID('4')
  certificateTypeId: string;

  @ApiProperty({ example: [{ id: faker.string.uuid(), score: 9, image: '/uploads/1742028280167-563721209.jpeg' }] })
  @IsOptional()
  @ArrayNotEmpty()  
  users: User[];
}
