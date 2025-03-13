import { IsInt, IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

export class SignInResponse {
    @ApiProperty({
        example: jwt.sign(
            {
                id: faker.string.uuid()
            },
            'accessToken'
        ),
        description: 'JWT authentication access token'
    })
    @IsNotEmpty()
    @IsJWT()
    token: string;

    @ApiProperty({
        example: jwt.sign(
            {
                id: faker.string.uuid()
            },
            'refreshToken'
        ),
        description: 'JWT authentication refresh token'
    })
    @IsNotEmpty()
    @IsJWT()
    refreshToken: string;

    @ApiProperty({
        type: Number,
        example: 1728055081
    })
    @IsNotEmpty()
    @IsInt()
    expireAt: number;

    @ApiProperty({
        example: "TEACHER"
    })
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({
        example: "b1b2b3b4b5b6b7b8b9b0"
    })
    @IsNotEmpty()
    @IsString()
    id: string;
}
