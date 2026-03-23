export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  totalPriceCents: number;
}

export interface ApiErrorShape {
  message: string;
  status?: number;
}

class ApiError extends Error implements ApiErrorShape {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function resolveApiBaseUrl() {
  if (window.location.port === '5173') {
    return 'http://localhost:3000/api';
  }

  return '/api';
}

async function parseJson(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${resolveApiBaseUrl()}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? String(payload.message)
        : `Request failed: ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export function fetchProducts() {
  return request<{ items: Product[] }>('/products');
}

export function login(email: string, password: string) {
  return request<{ message: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export function logout() {
  return request<{ success: boolean }>('/auth/logout', {
    method: 'POST'
  });
}

export function fetchCurrentUser() {
  return request<{ user: User }>('/auth/me');
}

export function fetchCart() {
  return request<CartResponse>('/cart');
}

export function addCartItem(productId: number, quantity: number) {
  return request<CartResponse>('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity })
  });
}
