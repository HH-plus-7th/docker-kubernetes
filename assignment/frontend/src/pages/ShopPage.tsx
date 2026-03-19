import type { CartResponse, Product, User } from '../api/client';

interface ShopPageProps {
  cart: CartResponse | null;
  loading: boolean;
  onAddToCart: (productId: number) => Promise<void>;
  onRefreshState: () => Promise<void>;
  products: Product[];
  user: User | null;
}

export function ShopPage({
  cart,
  loading,
  onAddToCart,
  onRefreshState,
  products,
  user
}: ShopPageProps) {
  return (
    <div className="shop-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Current Session</p>
            <h2>Storefront state</h2>
          </div>
          <button type="button" onClick={() => void onRefreshState()}>
            Refresh State
          </button>
        </div>

        <dl className="meta-list">
          <div>
            <dt>User</dt>
            <dd>{user ? `${user.name} (${user.email})` : 'No verified session'}</dd>
          </div>
          <div>
            <dt>Cart quantity</dt>
            <dd>{cart?.totalQuantity ?? 0}</dd>
          </div>
          <div>
            <dt>Cart total</dt>
            <dd>{formatCurrency(cart?.totalPriceCents ?? 0)}</dd>
          </div>
        </dl>

        {cart?.items?.length ? (
          <ul className="cart-list">
            {cart.items.map((item) => (
              <li key={item.id}>
                <strong>{item.product.name}</strong>
                <span>
                  {item.quantity} x {formatCurrency(item.product.priceCents)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No cart items loaded.</p>
        )}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Products</p>
            <h2>Catalog</h2>
          </div>
          {loading ? <span className="pill">Loading...</span> : <span className="pill">Ready</span>}
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-footer">
                <div>
                  <strong>{formatCurrency(product.priceCents)}</strong>
                  <span>Stock {product.stock}</span>
                </div>
                <button type="button" onClick={() => void onAddToCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value / 100);
}
