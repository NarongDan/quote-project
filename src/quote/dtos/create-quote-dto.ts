import { IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  content: string;
}
