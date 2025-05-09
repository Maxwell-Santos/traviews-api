export class EmailService {
  sendWelcomeEmail(email: string): Promise<void> {
    // Simulate sending an email
    return new Promise((resolve) => {
      console.log(`Sending welcome email to ${email}`)
      setTimeout(() => {
        console.log(`Welcome email sent to ${email}`)
        resolve()
      }, 1000)
    })
  }
}
