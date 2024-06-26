import { NatsPublisher } from "./natPublisher";
async function sendWelcomeEmail(email: string, userType: string) {
  const subject = 'send_welcome_email';
  const data = { email, userType };
  await NatsPublisher.publish(subject, data);
}

async function sendPasswordResetEmail(email: string, resetLink: string) {
  const subject = 'reset_email_password';
  const data = { email, resetLink };
  await NatsPublisher.publish(subject, data);
}

// Usage
sendWelcomeEmail('user@example.com', 'merchant');
sendPasswordResetEmail('user@example.com', 'https://example.com/reset-password?token=abc123');