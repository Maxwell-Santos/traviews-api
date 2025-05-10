import { randomUUID } from 'crypto'
import { IUser } from './IUser'

export class User implements IUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt?: Date

  constructor(name: string, email: string, password: string) {
    this.id = randomUUID()
    this.createdAt = new Date().toISOString()

    this.name = name
    this.email = email
    this.password = password
  }
}
