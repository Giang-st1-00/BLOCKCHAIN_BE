import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class BaseResponse {
    @ApiProperty({ example: faker.string.uuid() })
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty({
        type: Number,
        example: faker.date.recent().getTime()
    })
    @IsOptional()
    @IsInt()
    createdAt?: number;

    @ApiProperty({
        type: Number,
        example: faker.date.recent().getTime()
    })
    @IsOptional()
    @IsInt()
    updatedAt?: number;
}
