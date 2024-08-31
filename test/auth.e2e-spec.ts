import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module'; // ปรับเส้นทางให้ตรงกับโครงสร้างของคุณ

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../src/auth/auth.service';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(AuthService)

      .useValue(mockAuthService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const mockAuthService = {
    register: jest.fn((dto) => {
      return Promise.resolve({ id: Math.floor(Math.random() * 10000), ...dto });
    }),
    signIn: jest.fn((dto) => {
      return Promise.resolve({ accessToken: 'mockAccessToken' });
    }),
    // Mock other methods if necessary
  };

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            username: 'test',
            email: 'test@example.com',
          }),
        );
      });
  });

  it('/auth/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({ accessToken: expect.any(String) });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
