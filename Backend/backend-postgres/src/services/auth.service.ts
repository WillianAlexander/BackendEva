/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { Issuer, Client, generators, TokenSet } from 'openid-client';

@Injectable()
export class AuthService {
  private client: Client;

  constructor() {
    this.init()
      .then(() => console.log('Azure client initialized', 'AuthService'))
      .catch((err) => console.log(err));
  }

  private async init() {
    const issuerUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`;

    const azureIssuer = await Issuer.discover(issuerUrl);

    this.client = new azureIssuer.Client({
      client_id: process.env.AZURE_CLIENT_ID!,
      client_secret: process.env.AZURE_CLIENT_SECRET!,
      redirect_uris: [process.env.AZURE_REDIRECT_URI!],
      response_types: ['code'],
    });
  }

  generatePKCE() {
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    return { codeVerifier, codeChallenge };
  }

  getAuthUrl(codeChallenge: string): string {
    if (
      !codeChallenge ||
      typeof codeChallenge !== 'string' ||
      codeChallenge.trim() === ''
    ) {
      throw new Error(
        'El parámetro codeChallenge es inválido. Debe ser una cadena no vacía.',
      );
    }

    const url: string = this.client.authorizationUrl({
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    if (!url || typeof url !== 'string' || url.trim() === '') {
      throw new Error('La URL generada es inválida.');
    }

    try {
      new URL(url);
    } catch {
      throw new Error('La URL generada no es válida.');
    }

    return url;
  }

  async exchangeCode(code: string, codeVerifier: string): Promise<TokenSet> {
    const tokenSet = await this.client.callback(
      process.env.AZURE_REDIRECT_URI!,
      { code },
      { code_verifier: codeVerifier },
    );
    return tokenSet;
  }
}
