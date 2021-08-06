/* eslint-disable no-unused-vars */
import { UserRole } from '../user';

declare global {
  namespace Express {
    interface Request {
      role?: UserRole;
      userId?: string;
      userName?: string;
    }
  }
}
