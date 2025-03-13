import { Body, Controller, Delete, Get, HttpStatus, Param, Post, HttpCode, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '~users/services/user.service';
import { UserResponse } from '../responses/user.response';
import { CreateUserDto } from '../dto/create-user.dto';
import { SuccessResponse } from '~core/http/responses/success.response';
import { UserRoleEnum } from '~users/enums/user-role.enum';

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    @ApiOperation({ description: `Get all users` })
    @ApiOkResponse({ type: UserResponse, isArray: true })
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<UserResponse[] | null> {
        return this.userService.getAll();
    }

    @Get('code/:code')
    @ApiOperation({ description: `Get a user's profile by Code` })
    @ApiOkResponse({ type: UserResponse })
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('code') code: string): Promise<UserResponse | null> {
        return this.userService.findByCode(code);
    }

    @Get('userId/:userId')
    @ApiOperation({ description: `Get a user's profile by Id` })
    @ApiOkResponse({ type: UserResponse })
    @HttpCode(HttpStatus.OK)
    getById(@Param('userId') userId: string): Promise<UserResponse | null> {
        return this.userService.findByCode(userId);
    }

    @Get('role/:role')
    @ApiOperation({ description: `Get user by role` })
    @ApiOkResponse({ type: UserResponse, isArray: true })
    @HttpCode(HttpStatus.OK)
    getByRole(@Param('role') role: UserRoleEnum): Promise<UserResponse[]> {
        return this.userService.getByRole(role);
    }

    @Post()
    @ApiOperation({ description: `Create user` })
    @ApiOkResponse({ type: UserResponse })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return this.userService.create(createUserDto)
    }

    @Put(':id')
    @ApiOperation({ description: 'Update a blog' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ type: SuccessResponse })
    update(
        @Param('id') idUser: string,
        @Body() updateUserDto: CreateUserDto
    ): Promise<SuccessResponse> {
        return this.userService.update(idUser, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ description: 'Delete a blog' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ type: SuccessResponse })
    delete(@Param('id') idUser: string): Promise<SuccessResponse> {
        return this.userService.delete(idUser);
    }
}
