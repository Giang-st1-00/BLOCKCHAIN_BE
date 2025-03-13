import { UserService } from '~users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { env } from '~config/env.config';
import bcrypt from 'bcrypt';
import { UserEntity } from '~users/entities/user.entity';
import { SignInResponse } from '~authentications/http/responses/sign-in.response';
import { Injectable } from '@nestjs/common';
import { UserResponse } from '~users/http/responses/user.response';
import { SignInDto } from '~users/http/dto/sign-in.dto';
import { SignUpResultType } from '~authentications/types/sign-up-result.type';
import { JwtPayloadType } from '~authentications/types/jwt-payload.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<SignInResponse> {
        const { code, password } = signInDto;

        const user = await this.userService.findOne({
            where: { code }
        });

        if (!user) {
            throw new Error("Not found user")
        }

        if (!user.password || password !== user.password ) {
            throw new UnauthorizedException('Your email address and/or password are incorrect.');
        }
        
        const signInResult = await this.createAuthResult(user, code);

        return signInResult;
    }

    async createAuthResult(user: UserEntity, code: string): Promise<SignUpResultType> {
        const payload: JwtPayloadType = { id: user.id, code };
        const {role, id} = user;

        const [token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.generateRefreshToken(payload),
        ]);
        const { exp: expireAt } = await this.jwtService.decode(token);

        return {
            id,
            role,
            token,
            refreshToken,
            expireAt
        };
    }

    generateRefreshToken(payload: JwtPayloadType): Promise<string> {
        const { id, code } = payload;

        return this.jwtService.signAsync(
            { id, code },
            {
                secret: env.JWT.REFRESH_SECRET,
                expiresIn: env.JWT.REFRESH_EXPIRE
            }
        );
    }
}
