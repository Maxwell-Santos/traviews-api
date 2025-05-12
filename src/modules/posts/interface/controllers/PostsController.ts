import { Request, Response } from 'express'

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}

import { PublishPostUseCase } from '../../application/use-cases/PublishPostUseCase'
import { PostRepository } from '../../domain/repositories/PostRepository'
import { Database } from '../../../../shared/database/connection'

export class PostController {
  static async create(req: Request, res: Response) {
    const useCase = new PublishPostUseCase(new PostRepository(Database.getInstance()))

    const userId = req.user?.id // Assumindo que req.user é populador pelo JWT middleware
    req.body.userId = userId

    try {
      const result = await useCase.execute(req.body)
      res.status(201).json({ id: result.id })
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message })
    }
  }
}
