import { Request, Response } from 'express'
import { LoginUser } from '../../../application/use-cases/LoginUser'
import { UserRepository } from '../../../../user/domain/repositories/UserRepository'
import { AuthService } from '../../services/AuthService'

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    const useCase = new LoginUser(new UserRepository(), new AuthService())

    const result = await useCase.execute({ email, password })

    res.json(result)
  }
}
