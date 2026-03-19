import { CookieOptions } from 'express';
import { loadConfig } from './config';

export function buildSessionCookieOptions(): CookieOptions {
  const config = loadConfig();

  return {
    httpOnly: true,
    sameSite: config.cookieSameSite,
    secure: config.cookieSecure,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
  };
}

export function buildClearedSessionCookieOptions(): CookieOptions {
  return {
    ...buildSessionCookieOptions(),
    maxAge: 0
  };
}
