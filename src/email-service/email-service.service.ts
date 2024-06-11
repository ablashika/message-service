import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly logger: Logger) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'anahi.donnelly@ethereal.email',
          pass: '8UdYc4nwnTFbrgSjfg'
      
      },
    });
  }

  async sendMail(email: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: 'anahi.donnelly@ethereal.email',
        to: email,
        subject: subject,
        text: text,
      };
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, userType: string) {
    let subject, text;
    if (userType === 'merchant') {
      subject = 'Welcome Merchant';
      text = 'Welcome to our platform, esteemed merchant!';
    } else if (userType === 'admin') {
      subject = 'Welcome Admin';
      text = 'Welcome to our platform, respected admin!';
    } else {
      subject = 'Welcome';
      text = 'Welcome to our platform!';
    }
    await this.sendMail(email, subject, text);
  }

  async resetEmailPassword(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: 'anahi.donnelly@ethereal.email',
        to,
        subject,
        text,
      };
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error.message);
      throw error;
    }
  }


  async merchantApprove(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: 'anahi.donnelly@ethereal.email',
        to,
        subject,
        text,
      };
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Merchat Email Approval sent successfully');
    } catch (error) {
      this.logger.error('Error sending approval email:', error.message);
      throw error;
    }
  }

  async merchantDecline(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: 'anahi.donnelly@ethereal.email',
        to,
        subject,
        text,
      };
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Merchant dicline');
    } catch (error) {
      this.logger.error('Error declining merchant:', error.message);
      throw error;
    }
  }
  
}


