export class SmsRequestDto {
    to: string;
    message: string;
  }
  
  export class SmsResponseDto {
    success: boolean;
    message?: string;
  }
  