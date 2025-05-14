import { Request, Response } from 'express'
import 'dotenv/config'

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

import { MediaStorageFacade } from '../../domain/contracts/MediaStorateFacade'

export class PostController {
  constructor(private readonly mediaStorage: MediaStorageFacade) {}

  async create(req: Request, res: Response) {
    const useCase = new PublishPostUseCase(
      new PostRepository(Database.getInstance()),
      this.mediaStorage,
    )

    const userId = req.user?.id // Assumindo que req.user é populador pelo JWT middleware
    req.body.userId = userId

    try {
      const result = await useCase.execute(req.body)
      res.status(201).json(result)
    } catch (error: any) {
      res.status(error.status || 400).json({ error: error.message })
    }
  }
}
