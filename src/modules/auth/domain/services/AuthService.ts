import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import { User } from '../../../user/domain/entities/User'

export const JWT_SECRET = process.env.JWT_SECRET || 'secreto'

export class AuthService {
  validatePassword(plain: string, ahash: string): boolean {
    const hash = createHash('sha256')
    return hash.update(plain).digest('hex') === ahash
  }

  generateToken(user: User): string {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1m',
    })
  }
}
