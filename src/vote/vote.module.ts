import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
  imports: [PrismaModule],
})
export class VoteModule {}
