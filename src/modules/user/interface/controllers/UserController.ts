import { Request, Response } from 'express'
import { CreateAccount } from '../../application/use-cases/CreateAccount'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { EmailService } from '../../infra/services/EmailService'
import { Database } from '../../../../shared/database/connection'

export class UserController {
  static async profile(req: Request, res: Response) {
    return res.status(200).json(req.user)
  }

  static async create(req: Request, res: Response) {
    const useCase = new CreateAccount(
      new UserRepository(Database.getInstance()),
      new EmailService(),
    )

    try {
      const result = await useCase.execute(req.body)
      res.json({ id: result.id })
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message })
    }
  }
}
