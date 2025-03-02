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
};
