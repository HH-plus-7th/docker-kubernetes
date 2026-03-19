import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { loadConfig } from '../common/config';
import { buildClearedSessionCookieOptions, buildSessionCookieOptions } from '../common/cookie';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser, SessionPayload } from './auth.types';

@Injectable()
export class AuthService {
  private readonly config = loadConfig();

  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.toAuthUser(user);
  }

  async getAuthenticatedUser(request: Request): Promise<AuthUser | null> {
    const token = request.cookies?.[this.config.cookieName];
    if (!token) {
      return null;
    }

    const payload = this.verifySession(token);
    if (!payload) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }
    });

    if (!user) {
      return null;
    }

    return this.toAuthUser(user);
  }

  async requireAuthenticatedUser(request: Request): Promise<AuthUser> {
    const user = await this.getAuthenticatedUser(request);
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    return user;
  }

  writeSessionCookie(response: Response, user: AuthUser) {
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email
      },
      this.config.jwtSecret,
      { expiresIn: '7d' }
    );

    response.cookie(this.config.cookieName, token, buildSessionCookieOptions());
  }

  clearSessionCookie(response: Response) {
    response.cookie(this.config.cookieName, '', buildClearedSessionCookieOptions());
  }

  private verifySession(token: string): SessionPayload | null {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret);
      if (!decoded || typeof decoded === 'string') {
        return null;
      }

      const subject =
        typeof decoded.sub === 'number'
          ? decoded.sub
          : typeof decoded.sub === 'string'
            ? Number(decoded.sub)
            : Number.NaN;

      if (!Number.isInteger(subject) || typeof decoded.email !== 'string') {
        return null;
      }

      return {
        sub: subject,
        email: decoded.email
      };
    } catch {
      return null;
    }
  }

  private toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }
}
