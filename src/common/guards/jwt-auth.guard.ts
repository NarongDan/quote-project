import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// use to prevent authenticated person
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Old code, use JwtStrategy + JwtAuthGaurd  instead

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtAuthGaurd implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('No authorization header');
//     }

//     const [bearer, token] = authHeader.split(' ');
//     if (bearer !== 'Bearer' || !token) {
//       throw new UnauthorizedException('Invalid token format');
//     }

//     try {
//       const payload = await this.jwtService.verifyAsync(token);
//       request.user = payload;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }
