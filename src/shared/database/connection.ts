import { Pool } from 'pg'
import 'dotenv/config'

export interface IDatabase {
  query<T>(query: string, params: any[]): Promise<T[] | void>
}

export class Database implements IDatabase {
  private static instance: Database
  private pool: Pool

  private constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Supabase exige SSL
      },
    })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async query<T>(query: string, params: []): Promise<T[] | void> {
    try {
      const { rows, fields } = await this.pool.query(query, params)
      return rows
    } catch (err) {
      console.error('Erro na consulta:', err)
    }
  }

  public async end() {
    await this.pool.end()
  }
}
