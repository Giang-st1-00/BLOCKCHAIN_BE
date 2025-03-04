import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({ example: "21IT543" })
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        example: "123123"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
