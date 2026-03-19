import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import {
  addCartItem,
  fetchCart,
  fetchCurrentUser,
  fetchProducts,
  login,
  logout,
  type ApiErrorShape,
  type CartResponse,
  type Product,
  type User
} from './api/client';
import { LoginPage } from './pages/LoginPage';
import { ShopPage } from './pages/ShopPage';

type View = 'login' | 'shop';

function App() {
  const [view, setView] = useState<View>('shop');
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState('Loading storefront state...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void bootstrap();
  }, []);

  async function bootstrap() {
    setLoading(true);

    try {
      const productResponse = await fetchProducts();
      setProducts(productResponse.items);
    } catch (error) {
      setStatusMessage(getMessage(error, 'Product list request failed.'));
    }

    try {
      const authResponse = await fetchCurrentUser();
      setUser(authResponse.user);
      setView('shop');

      const cartResponse = await fetchCart();
      setCart(cartResponse);
      setStatusMessage(`Authenticated as ${authResponse.user.name}.`);
    } catch {
      setUser(null);
      setCart(null);
      setStatusMessage('Browsing as guest. Login status could not be verified.');
      setView('login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(email: string, password: string) {
    setStatusMessage('Sending login request...');

    try {
      const response = await login(email, password);
      setStatusMessage(`${response.message}. Verifying session...`);

      try {
        const authResponse = await fetchCurrentUser();
        setUser(authResponse.user);
        setView('shop');
        const cartResponse = await fetchCart();
        setCart(cartResponse);
        setStatusMessage(`Welcome back, ${authResponse.user.name}.`);
      } catch {
        setUser(null);
        setCart(null);
        setStatusMessage(
          `${response.message}, but session verification failed. Check network behavior.`
        );
      }
    } catch (error) {
      setStatusMessage(getMessage(error, 'Login failed.'));
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      return;
    }

    setUser(null);
    setCart(null);
    setView('login');
    setStatusMessage('Logged out.');
  }

  async function handleAddToCart(productId: number) {
    setStatusMessage('Adding item to cart...');

    try {
      const updatedCart = await addCartItem(productId, 1);
      setCart(updatedCart);
      setStatusMessage('Cart updated.');
    } catch (error) {
      setStatusMessage(getMessage(error, 'Cart update failed.'));
    }
  }

  return (
    <Layout
      onGoLogin={() => setView('login')}
      onGoShop={() => setView('shop')}
      onLogout={handleLogout}
      user={user}
      statusMessage={statusMessage}
    >
      {view === 'login' ? (
        <LoginPage onSubmit={handleLogin} />
      ) : (
        <ShopPage
          loading={loading}
          user={user}
          products={products}
          cart={cart}
          onRefreshState={bootstrap}
          onAddToCart={handleAddToCart}
        />
      )}
    </Layout>
  );
}

function getMessage(error: unknown, fallback: string) {
  const candidate = error as ApiErrorShape | undefined;
  return candidate?.message ?? fallback;
}

export default App;
