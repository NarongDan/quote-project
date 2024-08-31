import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [PrismaModule],
})
export class QuoteModule {}
