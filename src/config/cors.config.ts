import { HttpStatus } from '@nestjs/common';
import { env } from '~config/env.config';

export const corsConfig = {
    origin: '*',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Content-Length, X-Knowledge-Base',
    credentials: false,
    optionsSuccessStatus: HttpStatus.OK
};
