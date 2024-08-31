import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dtos/create-quote-dto';
import { UserDto } from '../common/dtos/user.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { SearchParamsDto } from './dtos/search-params.dto';

@Injectable()
export class QuoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuoteDto: CreateQuoteDto, user: UserDto) {
    try {
      return await this.prisma.quote.create({
        data: {
          ...createQuoteDto,
          authorId: user.id,
          authorName: user.username,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create quote');
    }
  }

  async findAll() {
    const quotes = await this.prisma.quote.findMany({
      include: {
        _count: {
          select: { votes: true },
        },
      },
    });

    return quotes.map((quote) => ({
      ...quote,
      votesCount: quote._count.votes,
    }));
  }

  async findOne(id: number) {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
      include: {
        _count: {
          select: { votes: true },
        },
      },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return {
      ...quote,
      votesCount: quote._count.votes,
    };
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto, user: UserDto) {
    const quote = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    if (quote.authorId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this quote',
      );
    }
    return this.prisma.quote.update({
      where: { id },
      data: updateQuoteDto,
    });
  }

  async delete(id: number, user: UserDto) {
    const quote = await this.prisma.quote.findUnique({ where: { id } });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    if (quote.authorId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this quote',
      );
    }
    return this.prisma.$transaction(async (prisma) => {
      //delete votes first
      await prisma.vote.deleteMany({
        where: { quoteId: id },
      });

      // then delete quote
      return prisma.quote.delete({
        where: { id },
      });
    });
  }

  async search(searchParams: SearchParamsDto) {
    const { search } = searchParams;
    if (!search) {
      return this.findAll(); // Return all quotes if no search term is provided
    }

    const quotes = await this.prisma.quote.findMany({
      where: {
        OR: [
          { content: { contains: search } },
          { authorName: { contains: search } },
        ],
      },
      include: {
        _count: {
          select: { votes: true },
        },
      },
    });

    return quotes.map((quote) => ({
      ...quote,
      votesCount: quote._count.votes,
    }));
  }
}
