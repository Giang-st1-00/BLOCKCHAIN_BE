import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { BaseResponse } from "~core/http/responses/base.response";
import { UserRoleEnum } from "~users/enums/user-role.enum";

export class CertificateTypeResponse extends BaseResponse {
    @ApiProperty({ example: "JLPT" })
    @IsNotEmpty()
    name: string;
}
