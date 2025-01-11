// backend/src/types/authTypes.ts
import { Request } from 'express';

export interface UserPayload {
    id: string;
    email?: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserPayload;
    cookies: any;
    header: any;
    body: any;
    params: any;
}