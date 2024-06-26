import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { natsConfig } from '../config/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private client: ClientProxy;
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'mohammed30@ethereal.email',
        pass: 'YTHcgWJhUNQZwcQnDD'
      }
    });

    this.client = ClientProxyFactory.create(natsConfig);
  }

  private createMailOptions(to: string, subject: string, text: string) {
    return {
      from: 'mohammed30@ethereal.email',
      to,
      subject,
      text,
    };
  }

  async sendMail(email: string, subject: string, text: string) {
    try {
      
      const mailOptions = this.createMailOptions(email, subject, text);
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error;
    }
  }

  async resetEmailPassword(email: string, resetLink: string) {
    const subject = 'Password Reset Request';
    const text = `Click the link to reset your password: ${resetLink}`;
    await this.sendMail(email, subject, text);
    await this.client.emit('password_reset', { email, resetLink }).toPromise();
  }

  async merchantApprove(email: string) {
    const subject = 'Merchant Approved';
    const text = 'Congratulations! Your merchant application has been approved.';
    await this.sendMail(email, subject, text);
    await this.client.emit('merchant_approved', { email, subject, text }).toPromise();
  }

  async merchantDecline(email: string) {
    const subject = 'Merchant Application Declined';
    const text = `We regret to inform you that your merchant application has been declined.`;
    await this.sendMail(email, subject, text);
    await this.client.emit('merchant_declined', { email, subject, text }).toPromise();
  }

  async cashOut(email: string) {
    const subject = 'Cash Out Successful';
    const text = `Cash-out was successful.`;
    await this.sendMail(email, subject, text);
    await this.client.emit('cash_out', { email, subject, text }).toPromise();
  }

  async settlements(email: string) {
    const subject = 'Bank Transfer Success';
    const text = `Settlement was successful.`;
    await this.sendMail(email, subject, text);
    await this.client.emit('settlements', { email, subject, text }).toPromise();
  }
}