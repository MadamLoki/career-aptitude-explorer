import { Request, Response, NextFunction } from 'express';
import { validationResult as expressValidatorResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

function validationResult(req: Request) {
  return expressValidatorResult(req);
}
