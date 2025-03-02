import { HttpStatus } from '@nestjs/common';
import { env } from '~config/env.config';

export const corsConfig = {
    origin: env.CORS.ALLOWED_ORIGINS,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Content-Length, X-Knowledge-Base',
    credentials: true,
    optionsSuccessStatus: HttpStatus.OK
};
