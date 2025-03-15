import { faker } from "@faker-js/faker";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { CertificateStatusEnum } from "~certificates/enums/certificateStatus.enum";
import { BaseResponse } from "~core/http/responses/base.response";
import { UserRoleEnum } from "~users/enums/user-role.enum";

export class CertificateResponse extends BaseResponse {
    @ApiProperty({
        example: CertificateStatusEnum.PENDING
    })
    @IsEnum(CertificateStatusEnum)
    status: CertificateStatusEnum;

    @ApiProperty({
        example: 9
    })
    @IsNumber()
    score: number;

    @ApiProperty({ example: "/uploads/1742028280167-563721209.jpeg" })
    @IsNotEmpty()
    image: string;

    @ApiPropertyOptional({ example: faker.string.uuid() })
    @IsOptional()
    @IsUUID('4')
    certificateTypeId: string;
}
