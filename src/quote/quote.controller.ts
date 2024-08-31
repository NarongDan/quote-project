import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUserInterceptor } from '../common/interceptors/current-user.interceptor';
import { CreateQuoteDto } from './dtos/create-quote-dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDto } from '../common/dtos/user.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { SearchParamsDto } from './dtos/search-params.dto';

@Controller('quote')
@UseGuards(JwtAuthGuard)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  @UseInterceptors(CurrentUserInterceptor)
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.quoteService.create(createQuoteDto, user);
  }

  @Get('search')
  async searchQuotes(@Query() searchParams: SearchParamsDto) {
    return this.quoteService.search(searchParams);
  }

  @Get()
  async getAllQuote() {
    return this.quoteService.findAll();
  }

  @Get(':id')
  async getQuote(@Param('id') id: number) {
    return this.quoteService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(CurrentUserInterceptor)
  async updateQuote(
    @Param('id') id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.quoteService.update(id, updateQuoteDto, user);
  }

  @Delete(':id')
  @UseInterceptors(CurrentUserInterceptor)
  async deleteQuote(@Param('id') id: number, @CurrentUser() user: UserDto) {
    return this.quoteService.delete(id, user);
  }
}
