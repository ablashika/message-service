
import { Injectable , Logger} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmsService {

    private readonly logger = new Logger(SmsService.name);

  async sendSms(to: string, message: string): Promise<void> {
    // Construct the Sprint email-to-SMS gateway address
    const gatewayAddress = `${to}@messaging.sprintpcs.com`;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zelda.koepp8@ethereal.email',
            pass: '6Txu7r5mzwJeZP36tF'
        }
    });

    // Construct the email message
    const mailOptions = {
      from: 'zelda.koepp8@ethereal.email',
      to: gatewayAddress,
      subject: '', // Subject is usually not required for SMS gateways
      text: message,
    };

    try {
      // Send the email message
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
      const gatewayAddress = `${phoneNumber}@messaging.sprintpcs.com`; // Update with the correct SMS gateway address

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

      // Return the generated OTP
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      throw new Error('Failed to send OTP');
    }
  }

 
}