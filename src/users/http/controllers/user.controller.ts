import { Body, Controller, Delete, Get, HttpStatus, Param, Post, HttpCode, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '~users/services/user.service';
import { UserResponse } from '../responses/user.response';
import { CreateUserDto } from '../dto/create-user.dto';
import { SuccessResponse } from '~core/http/responses/success.response';
import { UserRoleEnum } from '~users/enums/user-role.enum';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
        return this.userService.findByuserId(userId);
    }

    @Get('role/:role')
    @ApiOperation({ description: `Get user by role` })
    @ApiOkResponse({ type: UserResponse, isArray: true })
    @HttpCode(HttpStatus.OK)
    getByRole(@Param('role') role: UserRoleEnum): Promise<UserResponse[]> {
        return this.userService.getByRole(role);
    }

    @Get('all')
    @ApiOperation({ description: `Get all users` })
    @ApiOkResponse({ type: UserResponse, isArray: true })
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<UserResponse[] | null> {
        return this.userService.getAll();
    }

    @Post('uploadImage')
    @ApiOperation({ description: `Upload an image file` })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Lưu vào thư mục uploads
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { filePath: `/uploads/${file.filename}` };
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
    

    @Post()
    @ApiOperation({ description: `Create user` })
    @ApiOkResponse({ type: UserResponse })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return this.userService.create(createUserDto)
    }
}
