export interface AppConfig {
  clientOrigin: string;
  cookieName: string;
  cookieSameSite: 'lax' | 'strict' | 'none';
  cookieSecure: boolean;
  jwtSecret: string;
  port: number;
}

function readBoolean(name: string, fallback: boolean) {
  const raw = process.env[name];
  if (raw === undefined) {
    return fallback;
  }

  return raw === 'true';
}

export function loadConfig(): AppConfig {
  return {
    clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    cookieName: process.env.COOKIE_NAME ?? 'session',
    cookieSameSite: (process.env.COOKIE_SAME_SITE as AppConfig['cookieSameSite']) ?? 'lax',
    cookieSecure: readBoolean('COOKIE_SECURE', false),
    jwtSecret: process.env.JWT_SECRET ?? 'dev-super-secret',
    port: Number(process.env.PORT ?? 3000)
  };
}
