import { Request, Response } from 'express'
import { LoginUser } from '../../application/use-cases/LoginUser'
import { UserRepository } from '../../../user/domain/repositories/UserRepository'
import { AuthService } from '../../domain/services/AuthService'
import { Database } from '../../../../shared/database/connection'

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    const useCase = new LoginUser(new UserRepository(Database.getInstance()), new AuthService())

    try {
      const result = await useCase.execute({ email, password })
      res.json({ token: result })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
