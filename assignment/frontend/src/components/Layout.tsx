import type { PropsWithChildren } from 'react';
import type { User } from '../api/client';

interface LayoutProps extends PropsWithChildren {
  onGoLogin: () => void;
  onGoShop: () => void;
  onLogout: () => void;
  statusMessage: string;
  user: User | null;
}

export function Layout({
  children,
  onGoLogin,
  onGoShop,
  onLogout,
  statusMessage,
  user
}: LayoutProps) {
  return (
    <div className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Frontend Docker Communication Challenge</p>
          <h1>Northstar Supply</h1>
          <p className="lede">
            A storefront that looks simple until browser rules, cookies, and runtime boundaries
            start mattering.
          </p>
        </div>
        <nav className="nav">
          <button type="button" onClick={onGoShop}>
            Shop
          </button>
          <button type="button" onClick={onGoLogin}>
            Login
          </button>
          <button type="button" onClick={onLogout} disabled={!user}>
            Logout
          </button>
        </nav>
      </header>

      <section className="status-panel">
        <div>
          <span className="label">Auth status</span>
          <strong>{user ? `Signed in as ${user.email}` : 'Not verified'}</strong>
        </div>
        <p>{statusMessage}</p>
      </section>

      <main>{children}</main>
    </div>
  );
}
