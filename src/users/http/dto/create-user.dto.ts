import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsOptional, Matches, IsUUID, IsNumber, IsEnum, IsInt } from 'class-validator';
import { UserRoleEnum } from '~users/enums/user-role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty({ example: null })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ example: "21IT543" })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ example: "Le Truong Giang" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: "123123" })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: "2025-20-10" })
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({ example: UserRoleEnum.TEACHER })
    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;
}
