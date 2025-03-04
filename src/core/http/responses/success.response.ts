import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

export class SuccessResponse {
    @ApiProperty({ example: 'Success.' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
