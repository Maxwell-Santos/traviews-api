import { IUserRepository } from './IUserRepository'
import { IUser } from '../entities/IUser'
import { IDatabase } from '../../../../shared/database/connection'

export class UserRepository implements IUserRepository {
  private readonly dbInstance: IDatabase
  private readonly table = 'User'

  constructor(dataBaseInstance: IDatabase) {
    this.dbInstance = dataBaseInstance
  }

  async findById(userId: string): Promise<IUser | null> {
    const result = await this.dbInstance.query<IUser>(
      `SELECT id, email, name, created_at FROM "${this.table}" WHERE id = $1`,
      [userId],
    )

    if (!result) {
      throw new Error('Query returned void')
    }

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await this.dbInstance.query<IUser>(
      `SELECT * FROM "${this.table}" WHERE email = $1`,
      [email],
    )

    if (!result) {
      throw new Error('Query returned void')
    }

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async create(entity: IUser): Promise<{ id: string }> {
    const result = await this.dbInstance.query<IUser>(
      `INSERT INTO "${this.table}" (email, password, name) VALUES ($1, $2, $3) RETURNING id`,
      [entity.email, entity.password, entity.name],
    )

    if (!result) {
      throw new Error('Query returned void')
    }

    return result[0]
  }

  async update(user: IUser): Promise<void> {
    // TODO: Implementar update
  }

  async delete(userId: string): Promise<void> {
    // TODO: Implementar update
  }
}
