import { IDatabase } from '../../../../shared/database/connection'
import { PublishPostDTO } from '../dto/PublishPostDTO'
import { IPostRepository } from './IPostRepository'

export class PostRepository implements IPostRepository {
  private readonly dbInstance: IDatabase
  private readonly table = 'Post'

  constructor(dataBaseInstance: IDatabase) {
    this.dbInstance = dataBaseInstance
  }

  async create(entity: PublishPostDTO): Promise<{ id: string }> {
    const result = await this.dbInstance.query<{ id: string }>(
      `INSERT INTO "${this.table}" (user_id, date, description, medias, food_cost, accommodation_cost, entertainment_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        entity.userId,
        entity.date,
        entity.description,
        entity.medias,
        entity.visitCosts.food,
        entity.visitCosts.accommodation,
        entity.visitCosts.entertainment,
      ],
    )

    if (!result) {
      throw new Error('Query returned void')
    }

    return { id: result[0].id }
  }
}
