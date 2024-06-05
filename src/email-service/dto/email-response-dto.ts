import { IsOptional, IsString } from 'class-validator';

export class EmailResponseDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  messageId?: string;

  @IsOptional()
  @IsString()
  error?: string;
}
