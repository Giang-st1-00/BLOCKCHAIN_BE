import { env } from '~config/env.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isTest = process.env.NODE_ENV === 'TEST';

export const config: TypeOrmModuleOptions = {
    type: env.DATABASE.CONNECT,
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    username: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    database: env.DATABASE.NAME,
    entities: [`${env.ROOT_PATH}/**/*.entity.${isTest ? 'ts' : 'js'}`],
    migrations: [
        `${env.ROOT_PATH}/dist/migrations/*.js`,
        `${env.ROOT_PATH}/**/databases/migrations/*.${isTest ? 'ts' : 'js'}`
    ],
};
