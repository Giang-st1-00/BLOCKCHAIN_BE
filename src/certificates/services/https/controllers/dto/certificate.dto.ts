import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class IssueCertificateDto {
  @ApiProperty({ example: 'John Doe', description: 'Tên của người nhận chứng chỉ' })
  @IsString()
  name: string;

  @ApiProperty({ example: 95, description: 'Điểm số của chứng chỉ' })
  @IsNumber()
  score: number;

  @ApiProperty({ example: '0xD6557A2688Ab2cbA976ef4358F3001B0509E2D93', description: 'Địa chỉ ví của người nhận' })
  @IsString()
  recipient: string;
}
