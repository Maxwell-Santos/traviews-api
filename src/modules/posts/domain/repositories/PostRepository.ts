import { IDatabase } from '../../../../shared/database/connection'
import { keysToCamel } from '../../../../shared/utils/keysToCamel'
import supabase from '../../infra/supabase/client'
import { PublishPostDTO } from '../dto/PublishPostDTO'
import { IPost } from '../entities/IPost'
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

  async getPosts(limit: number, cursor: string): Promise<IPost[]> {
    let query = supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (cursor) {
      query = query.lt('created_at', cursor)
    }

    const { data, error } = await query

    if (error) {
      const e = new Error(error.message) as Error & { status?: number }
      e.status = 500

      throw e
    }

    return keysToCamel(data)
  }
}
