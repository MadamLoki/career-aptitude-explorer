// backend/src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, UserPayload } from '../types/authTypes.js';

const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        req.user = decoded;
        
        return next();
    } catch (error) {
        // console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};

export default authenticateToken;