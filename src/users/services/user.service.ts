import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import dayjs from 'dayjs';
import { UserEntity } from '~users/entities/user.entity';
import { CreateUserDto } from '~users/http/dto/create-user.dto';
import { UserResponse } from '~users/http/responses/user.response';
import { SuccessResponse } from '~core/http/responses/success.response';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {}

    save(entity: DeepPartial<UserEntity>, options?: SaveOptions): Promise<UserEntity> {
        return this.userRepo.save(entity, options);
    }

    findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
        return this.userRepo.findOne(options);
    }

    exist(options?: FindManyOptions<UserEntity>): Promise<boolean> {
        return this.userRepo.exist(options);
    }

    findById(
        userId: string,
        where?: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[]
    ): Promise<UserEntity | null> {
        return this.userRepo.findOneBy({
            id: userId,
            ...where
        });
    }

    async delete(idUser: string): Promise<SuccessResponse> {
        await this.userRepo.delete({
            id: idUser
        });

        return { message: 'Blog deleted successfully' };
    }


    async update(idUser: string, updateBlogDto: CreateUserDto): Promise<SuccessResponse> {
        const blog = await this.findOneOrFail({
            where: {
                id: idUser
            }
        });

        if (!blog) {
            throw new NotFoundException('User not found');
        }

        await this.userRepo.save({
            id: idUser,
            ...updateBlogDto
        });

        return { message: 'Blog updated successfully' };
    }

    async findOneOrFail(options: FindOneOptions<UserEntity>): Promise<UserEntity | void> {
        const blog = await this.userRepo.findOne(options);

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }
}
