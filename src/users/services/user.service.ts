import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UserEntity } from '~users/entities/user.entity';
import { CreateUserDto } from '~users/http/dto/create-user.dto';
import { SuccessResponse } from '~core/http/responses/success.response';
import Web3 from 'web3';
import { UserRoleEnum } from '~users/enums/user-role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {}
    
    create(entity: DeepPartial<UserEntity>, options?: SaveOptions): Promise<UserEntity> {
        // Tạo Web3 instance (không cần kết nối node để tạo ví)
        if (entity.role == UserRoleEnum.TEACHER) {
            const web3 = new Web3();

            // Tạo ví mới
            const account = web3.eth.accounts.create();
            entity.walletAddress = account.address;
            entity.walletPrivateKey = account.privateKey;
        }
       

        return this.userRepo.save(entity, options);
    }

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

    findByCode(
        userId: string,
    ): Promise<UserEntity | null> {
        return this.userRepo.findOneBy({
            id: userId
        });
    }

    async getAll(): Promise<UserEntity[] | null> {
        const users = await this.userRepo.find();
        return users;
    }

    async delete(idUser: string): Promise<SuccessResponse> {
        await this.userRepo.delete({
            id: idUser
        });

        return { message: 'Blog deleted successfully' };
    }

  

    async getByRole(role: UserRoleEnum): Promise<UserEntity[]> {
        return this.userRepo.find({
            where: {
                role
            }
        });
    }

    async update(idUser: string, updateBlogDto: CreateUserDto): Promise<SuccessResponse> {
        const user = await this.findOneOrFail({
            where: {
                id: idUser
            }
        });

        if (!user) {
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
