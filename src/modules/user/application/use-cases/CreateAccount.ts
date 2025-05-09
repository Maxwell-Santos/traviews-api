import { createHash } from 'crypto'
import { IUser } from '../../domain/entities/IUser'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { EmailService } from '../../infra/services/EmailService'
import { Email } from '../../../../shared/value-objects/Email'
import { User } from '../../domain/entities/User'

export class CreateAccount {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(input: IUser): Promise<void> {
    const { email: emailInput, name, password } = input

    await this.checkUserAlreadyExists(emailInput)

    const email = new Email(emailInput)

    await this.userRepository.create(new User(name, email.getValue(), this.hashPassword(password)))
    await this.emailService.sendWelcomeEmail(email.getValue())
  }

  private hashPassword(password: string): string {
    const hash = createHash('sha256')
    hash.update(password)

    return hash.digest('hex')
  }

  private async checkUserAlreadyExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email)

    const error = new Error('User already exists')
    error.name = 'UserAlreadyExistsError'
    error.status = 409

    if (existingUser) {
      throw error
    }
  }
}
