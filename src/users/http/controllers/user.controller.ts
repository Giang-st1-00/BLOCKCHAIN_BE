import { Body, Controller, Delete, Get, HttpStatus, Param, Post, HttpCode, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '~users/services/user.service';
import { UserResponse } from '../responses/user.response';
import { CreateUserDto } from '../dto/create-user.dto';
import { SuccessResponse } from '~core/http/responses/success.response';

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ description: `Get a user's profile` })
    @ApiOkResponse({ type: UserResponse })
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') userId: string): Promise<UserResponse | null> {
        return this.userService.findById(userId);
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
