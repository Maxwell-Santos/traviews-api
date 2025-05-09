export class Email {
  private readonly value: string

  constructor(email: string) {
    if (!this.validate(email)) {
      throw new Error('Email inválido.')
    }
    this.value = email
  }

  private validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  public getValue(): string {
    return this.value
  }

  // public equals(other: Email): boolean {
  //   return this.value === other.getValue()
  // }
}
