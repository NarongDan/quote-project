import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleVote(quoteId: number, userId: number) {
    const quote = await this.prisma.quote.findUnique({
      where: { id: quoteId },
    });
    if (!quote) {
      throw new NotFoundException('Quote not found.');
    }

    const existingVote = await this.prisma.vote.findUnique({
      where: { userId_quoteId: { userId, quoteId } },
    });

    if (existingVote) {
      // If a vote exists, remove it
      await this.prisma.vote.delete({
        where: { id: existingVote.id },
      });
      return 'Vote deleted';
    } else {
      // Check if the user has already voted on another quote
      const anyVote = await this.prisma.vote.findFirst({
        where: { userId },
      });

      if (anyVote) {
        throw new BadRequestException('You can only vote once.');
      }

      // Add a new vote
      return this.prisma.vote.create({
        data: {
          quoteId,
          userId,
        },
      });
    }
  }
}
