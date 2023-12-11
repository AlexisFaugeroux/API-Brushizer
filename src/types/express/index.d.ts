import express from 'express';
import type { User } from '../user.ts';
import type { UserJWTPayload } from '../../controllers/types.ts';

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: UserJWTPayload | null;
        }
    }
}
