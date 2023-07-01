// https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/
// Il va falloir prévoir la récupération de la public key côté front
import jwt from 'jsonwebtoken';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as url from 'url';
import { UserWithIpAddress, UserJWTPayload } from '../types/user.ts';
import ApiError from './apiError.ts';
import Error401 from './error401.ts';

export function generateToken(userData: UserWithIpAddress) {
    // const dirname = url.fileURLToPath(new URL('.', import.meta.url));
    // const privatekey = fs.readFileSync(path.join(dirname, '../../private.key'));
    // const buffer_privateKey = fs.readFileSync(
    //     path.join(dirname, '../../private.key'),
    // );
    // const b64_privatekey = Buffer.from(buffer_privateKey).toString('base64');
    // const privatekey = `
    // -----BEGIN OPENSSH PRIVATE KEY-----
    // ${b64_privatekey}
    // -----END OPENSSH PRIVATE KEY-----
    // `;

    const SignInOptions: jwt.SignOptions = {
        // algorithm: 'RS256',
        expiresIn: '1h',
    };

    return jwt.sign(
        {
            ...userData,
        },
        process.env.JWT_SECRET ?? 'supersecretphrase',
        SignInOptions,
    );
}

export function validateToken(token: string, ip: string): UserJWTPayload {
    // const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'));
    // const VerifyOptions: jwt.VerifyOptions = {
    //     algorithms: ['RS256'],
    // };
    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET ?? 'supersecretphrase',
            // VerifyOptions,
        ) as UserWithIpAddress;

        if (payload.ip !== ip) throw new Error401('Invalid token');

        const { password, ...userData } = payload;

        return userData;
    } catch (error: unknown) {
        throw new ApiError('API error', error as {});
    }
}
