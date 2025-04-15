/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login-url')
  getLoginUrl() {
    const { codeVerifier, codeChallenge } = this.authService.generatePKCE();
    const url = this.authService.getAuthUrl(codeChallenge);
    return { url, codeVerifier }; // En producción, guardar el codeVerifier en sesión o cache.
  }

  @Post('callback')
  async handleCallback(@Body() body: { code: string; codeVerifier: string }) {
    const tokens = await this.authService.exchangeCode(
      body.code,
      body.codeVerifier,
    );

    const email: string = this.authService.getUserFromIdToken(tokens);

    return {
      email: email,
      accessToken: tokens.access_token,
      idToken: tokens.id_token,
      expiresIn: tokens.expires_in,
    };
  }
}
