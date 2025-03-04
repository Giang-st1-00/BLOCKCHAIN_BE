import { JwtPayload } from 'jwt-decode';

export type JwtPayloadType = JwtPayload & {
    id: string;
    code: string;
};
