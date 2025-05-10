import { Request, Response } from 'express'
import { CreateAccount } from '../../application/use-cases/CreateAccount'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { EmailService } from '../../infra/services/EmailService'

export class PostController {
  async create(req: Request, res: Response) {
    const useCase = new CreateAccount(new UserRepository(), new EmailService())

    try {
      await useCase.execute(req.body)
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message })
    }
  }
}
