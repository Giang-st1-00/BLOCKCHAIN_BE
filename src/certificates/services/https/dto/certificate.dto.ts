import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class IssueCertificateDto {
  @ApiProperty({ example: 'John Doe', description: 'Tên của người nhận chứng chỉ' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123456', description: 'Mã chứng chỉ' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Math', description: 'Môn học' })
  @IsString()
  subject: string;

  @ApiProperty({ example: '1', description: 'ID của chứng chỉ' })
  @IsString()
  certificateId: string;
}
