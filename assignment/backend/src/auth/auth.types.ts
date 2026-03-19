export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface SessionPayload {
  sub: number;
  email: string;
}
