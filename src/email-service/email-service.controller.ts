
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email-service.service';
import {SendEmailDto} from "../shared/dto/send-email.dto"
import { UpdatePasswordEmailDto } from '../shared/dto/update-password-email.dto';
import { MerchantApprovalDto } from '../shared/dto/merchant-approval.dto';
import { MerchantDeclineDto } from '../shared/dto/merchant-decline.dto';
import { CashOutDto } from '../shared/dto/cash-out.dto';
import { SettlementsDto } from '../shared/dto/settlement.dto';

@Controller()
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @EventPattern('user_created')
    async handleUserCreated(data: { email: string }) {
        const { email } = data;
        const subject = 'Account Created Successfully';
        const text = 'Your account has been created successfully.';
        await this.emailService.sendMail(email, subject, text);
    }

    @EventPattern('send_email')
    async handleSendEmail(data: SendEmailDto) {
        const { to, subject, text } = data;
        await this.emailService.sendMail(to, subject, text);
    }

    @MessagePattern('reset_password')
    async handleResetPassword(data: UpdatePasswordEmailDto) {
        const { email, resetLink } = data;
        await this.emailService.resetEmailPassword(email, resetLink);
    }

    @EventPattern('merchant_approved')
    async handleMerchantApproved(data: MerchantApprovalDto) {
        const { email } = data;
        await this.emailService.merchantApprove(email);
    }

    @EventPattern('merchant_declined')
    async handleMerchantDeclined(data: MerchantDeclineDto) {
        const { email } = data;
        await this.emailService.merchantDecline(email);
    }

    @MessagePattern('cash_out')
    async handleCashOut(data: CashOutDto) {
        const { email } = data;
        await this.emailService.cashOut(email);
    }

    @MessagePattern('settlements')
    async handleSettlements(data: SettlementsDto) {
        const { email } = data;
        await this.emailService.settlements(email);
    }
}