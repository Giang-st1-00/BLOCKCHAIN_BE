import dotenv from 'dotenv';
dotenv.config();

export const env = {
    APP_PORT: Number(process.env.APP_PORT),
    APP_NAME: 'Blockchain Backend',
    BACKEND_URL: process.env.BACKEND_URL,
    WEB_URL: process.env.WEB_URL,
    ROOT_PATH: process.cwd(),
    CORS: {
        ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '*').split(',')
    },
    DATABASE: {
        CONNECT: process.env.DATABASE_CONNECT as any,
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
        REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        EXPIRE: process.env.JWT_EXPIRE || '7d',
        REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '14d'
    },
};
