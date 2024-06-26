import { Controller, Post, Body, Inject, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AppService } from './../app.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from "../shared/dto/create-user.dto";
import { ValidationPipe } from '@nestjs/common';
import { UpdatePasswordEmailDto } from '../shared/dto/update-password-email.dto';
import { MerchantApprovalDto } from '../shared/dto/merchant-approval.dto';
import { MerchantDeclineDto } from '../shared/dto/merchant-decline.dto';
import { CashOutDto } from '../shared/dto/cash-out.dto';
import { SettlementsDto } from '../shared/dto/settlement.dto';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  
  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService,
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  
  @Post('create')
  async createUserHttp(@Body() createUserDto: CreateUserDto) {
    await this.appService.createUser(createUserDto.email, createUserDto.userType);
    this.client.send({ cmd: 'user_created' }, { email: createUserDto.email, userType: createUserDto.userType });
    return { status: 'User created and email sent' };
  }


  @Post('login')
  async loginUserHttp(@Body('phoneNumber') phoneNumber: string, @Body('message') message: string) {
    await this.userService.loginUser(phoneNumber, message);
    return { status: 'Message sent successfully' };
  }


  @Post('login-otp')
  async loginUserOtpHttp(@Body('phoneNumber') phoneNumber: string) {
    await this.userService.loginUserSms(phoneNumber);
    return { status: 'OTP sent successfully' };
  }



  @Post('reset-password')
  async resetPasswordHttp(@Body() resetPassword: UpdatePasswordEmailDto) {
    await this.client.emit({ cmd: 'reset_password' }, { email: resetPassword.email, resetLink: resetPassword.resetLink });
    await this.appService.sendPasswordResetEmail(resetPassword.email, resetPassword.resetLink);
    return { status: 'Password reset email sent' };
  }

 
  @Post('merchant-approved')
  async merchantApprovedHttp(@Body() merchantApprovalDto: MerchantApprovalDto) {
    await this.client.emit({ cmd: 'merchant_approved' }, { email: merchantApprovalDto.email });
    await this.appService.merchantApproved(merchantApprovalDto.email);
    return { status: 'Merchant approved' };
  }


  @Post('merchant-decline')
  async merchantDeclinedHttp(@Body() merchantDeclineDto: MerchantDeclineDto) {
    await this.client.emit({ cmd: 'merchant_declined' }, { email: merchantDeclineDto.email });
    await this.appService.merchantDeclined(merchantDeclineDto.email);
    return { status: 'Merchant declined' };
  }


  @Post('cash-out')
  async cashoutHttp(@Body() cashOutDto: CashOutDto) {
    await this.client.emit({ cmd: 'cash_out' }, { email: cashOutDto.email });
    await this.appService.cashOut(cashOutDto.email);
    return { status: 'Cash out successful' };
  }


  @Post('settlements')
  async settlementsHttp(@Body() settlementsDto: SettlementsDto) {
    await this.client.emit({ cmd: 'settlements' }, { email: settlementsDto.email });
    await this.appService.settlements(settlementsDto.email);
    return { status: 'Settlement successful' };
  }
}