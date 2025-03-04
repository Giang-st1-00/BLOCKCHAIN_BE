import { JwtModule } from '@nestjs/jwt';
import { env } from '~config/env.config';

export const jwtConfig = JwtModule.registerAsync({
    useFactory: async () => ({
        secret: env.JWT.SECRET,
        signOptions: {
            expiresIn: env.JWT.EXPIRE,
            algorithm: 'HS512'
        }
    })
});
