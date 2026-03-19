import { FormEvent, useState } from 'react';

interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginPage({ onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState('participant@example.com');
  const [password, setPassword] = useState('Password123!');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(email, password);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel narrow">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Sign In</p>
          <h2>Challenge Account</h2>
        </div>
        <p>Use the seeded account or replace the values with any valid backend credentials.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Login'}
        </button>
      </form>
    </section>
  );
}
