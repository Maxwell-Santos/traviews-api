import { IUserRepository } from '../../../user/domain/repositories/IUserRepository'
import { AuthService } from '../../domain/services/AuthService'

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ id: string; token: string }> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      const error = new Error('Invalid credentials') as Error & { status: number }
      error.status = 404
      throw error
    }

    const isValidPassword = this.authService.validatePassword(password, user.password)

    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    return { id: user.id, token: this.authService.generateToken(user) }
  }
}
