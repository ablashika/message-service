

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'oda.carter25@ethereal.email',
        pass: '97U2eD4kHSSUMUHs1c'
    }

    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: 'oda.carter25@ethereal.email',
        to,
        subject,
        text,
      };
      await this.transporter.sendMail(mailOptions);

      console.log('Email sent successfully');

    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Rethrow the error for handling further up the call chain
    }
  }
}