import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { SingInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Check if email already exists
    const existingUserByEmail = await this.userService.findByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }
    // Check if username already exists
    const existingUserByName = await this.userService.findByUsername(username);
    if (existingUserByName) {
      throw new ConflictException('Username already in use');
    }
    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }

    // Create user
    try {
      return await this.userService.createUser(username, email, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async signIn(signInDto: SingInDto) {
    const { email, password } = signInDto;

    try {
      // check if email already exists or password is correct
      const user = await this.userService.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const payload = { username: user.username, sub: user.id };
      // create JWT token
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error during sign-in',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
