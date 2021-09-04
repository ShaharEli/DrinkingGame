import { UserRole } from './user';

export * from './user';
export * from './common';
export * from './tokens';
export * from './error';
export * from './dare';
export * from './game';
export * from './friendRequest';

declare global {
  namespace Express {
    interface Request {
      role?: UserRole;
      userId?: string;
      userName?: string;
    }
  }
}
