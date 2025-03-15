import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseResponse } from "~core/http/responses/base.response";
import { UserRoleEnum } from "~users/enums/user-role.enum";

export class UserResponse extends BaseResponse {
    @ApiProperty({ example: "21IT543" })
    @IsNotEmpty()
    code: string;

    @ApiProperty({ example: "uploads/...." })
    @IsOptional()
    image: string;

    @ApiProperty({ example: "Le Truong Giang" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "2025-10-20"
    })
    @IsNotEmpty()
    dateOfBirth: string;

    @ApiProperty({
        example: UserRoleEnum.TEACHER
    })
    @IsEnum(UserRoleEnum)
    @IsNotEmpty()
    role: UserRoleEnum;

    @ApiProperty({ example: "0xD6557A2688Ab2cbA976ef4358F3001B0509E2D93" })
    @IsNotEmpty()
    walletId?: string | null;
}
