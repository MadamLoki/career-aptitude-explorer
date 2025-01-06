import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

const authenticateToken = function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user as JwtPayload;
    next();
  });
};

export default authenticateToken;