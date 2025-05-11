import { IUser } from '../../domain/entities/IUser'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { EmailService } from '../../infra/services/EmailService'
import { Email } from '../../../../shared/value-objects/Email'
import { User } from '../../domain/entities/User'
import { hashPassword } from '../../../../shared/utils/hashPassword'

export class CreateAccount {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(input: IUser): Promise<void> {
    const { email: emailInput, name, password } = input

    await this.checkUserAlreadyExists(emailInput)

    const email = new Email(emailInput)

    await this.userRepository.create(new User(name, email.getValue(), hashPassword(password)))
    await this.emailService.sendWelcomeEmail(email.getValue())
  }

  private async checkUserAlreadyExists(email: string): Promise<void> {
    const result = await this.userRepository.findByEmail(email)

    if (result) {
      const error = new Error('User already exists') as Error & { status: number }
      error.name = 'UserAlreadyExistsError'
      error.status = 409
      throw error
    }
  }
}
