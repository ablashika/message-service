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
          user: 'trisha.vandervort23@ethereal.email',
          pass: '7Eeysh9AmJTQ8qqPpX'
      }
  });
  }

  private createMailOptions(to: string, subject: string, text: string) {
    return {
      from: 'anahi.donnelly@ethereal.email',
      to,
      subject,
      text,
    };
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
      this.logger.error('Error sending email:');
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
      const mailOptions = this.createMailOptions(to, subject, text)    
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:');
      throw error;
    }
  }


  async merchantApprove(to: string, subject: string, text: string) {
    try {
      const mailOptions = this.createMailOptions(to, subject, text)
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Merchat Email Approval sent successfully');
    } catch (error) {
      this.logger.error('Error sending approval email:');
      throw error;
    }
  }

  async merchantDecline(to: string, subject: string, text: string) {
    try {
      const mailOptions = this.createMailOptions(to, subject, text)
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Merchant dicline');
    } catch (error) {
      this.logger.error('Error declining merchant:');
      throw error;
    }
  }

  async settlements(to: string, subject: string, text: string) {
    try {
      const mailOptions = this.createMailOptions(to, subject, text)
      await this.transporter.sendMail(mailOptions);
      this.logger.log('settlements have been successful');
    } catch (error) {
      this.logger.error('settlements have been declined:');
      throw error;
    }
  }


  async cashOut(to: string, subject: string, text: string) {
    try {
      const mailOptions = this.createMailOptions(to, subject, text)
      await this.transporter.sendMail(mailOptions);
      this.logger.log('cashout successful');
    } catch (error) {
      this.logger.error('Error cashing out:');
      throw error;
    }
  }
  
}


