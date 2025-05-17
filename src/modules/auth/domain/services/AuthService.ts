import jwt from 'jsonwebtoken'
import { hashPassword } from '../../../../shared/utils/hashPassword'
import { IUser } from '../../../user/domain/entities/IUser'

export const JWT_SECRET = process.env.JWT_SECRET || 'secreto'

export class AuthService {
  validatePassword(incoming: string, found: string): boolean {
    return hashPassword(incoming) === found
  }

  generateToken(user: IUser): string {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    })
  }
}
