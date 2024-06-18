
import { Injectable , Logger} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendSms(to: string, message: string): Promise<void> {

    const gatewayAddress = `${to}@messaging.sprintpcs.com`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'trisha.vandervort23@ethereal.email',
          pass: '7Eeysh9AmJTQ8qqPpX'
      }
  });

    const mailOptions = {
      from: 'trisha.vandervort23@ethereal.email',
      to: gatewayAddress,
      subject: '',
      text: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('SMS sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      throw new Error('Failed to send SMS');
    }
  }


  
  async sendOtp(phoneNumber: string): Promise<void> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const gatewayAddress = `${phoneNumber}@messaging.sprintpcs.com`; 

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', 
        port: 587, 
        auth: {
          user: 'zelda.koepp8@ethereal.email', 
          pass: '6Txu7r5mzwJeZP36tF', 
        },
      });

      const mailOptions = {
        from: 'zelda.koepp8@ethereal.email', 
        to: gatewayAddress,
        subject: '',
        text: `Your OTP code is ${otp}`,
      };

      const info = await transporter.sendMail(mailOptions);
      this.logger.log('OTP sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      throw new Error('Failed to send OTP');
    }
  }

 
}