import { IsOptional, IsString } from 'class-validator';

export class EmailResponseDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  messageId?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  error?: string;
}
