export class Email {
  private value: string
  constructor(address: string) {
    if (!this.isValid(address)) {
      throw new Error('Endereço de e-mail inválido')
    }
    this.value = address.toLowerCase() // normalização
    Object.freeze(this) // torna o objeto imutável
  }

  private isValid(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  equals(otherEmail: Email) {
    return otherEmail instanceof Email && this.value === otherEmail.value
  }

  getValue() {
    return this.value
  }
}
