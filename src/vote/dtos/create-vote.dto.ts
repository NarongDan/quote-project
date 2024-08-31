import { IsInt } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  quoteId: number;
}
