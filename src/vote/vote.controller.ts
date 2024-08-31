import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { CurrentUserInterceptor } from '../common/interceptors/current-user.interceptor';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDto } from '../common/dtos/user.dto';

@Controller('vote')
@UseGuards(JwtAuthGuard)
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('toggle')
  @UseInterceptors(CurrentUserInterceptor)
  async toggleVote(
    @Body() createVoteDto: CreateVoteDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.voteService.toggleVote(createVoteDto.quoteId, user.id);
  }
}
