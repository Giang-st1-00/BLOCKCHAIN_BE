import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~authentications/services/auth.service';
import { SignInResponse } from '~authentications/http/responses/sign-in.response';
import { SignInDto } from '~users/http/dto/sign-in.dto';

@Controller('auth')
@ApiTags('Authentications')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOperation({ description: 'Sign in.' })
    @ApiCreatedResponse({ type: SignInResponse })
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        return this.authService.signIn(signInDto);
    }
}
