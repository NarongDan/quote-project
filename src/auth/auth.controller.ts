import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { SingInDto } from './dtos/signin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUserInterceptor } from '../common/interceptors/current-user.interceptor';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDto } from '../common/dtos/user.dto';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SingInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  @Get('me')
  async getMe(@CurrentUser() user: UserDto) {
    return plainToClass(UserDto, user);
  }
}
