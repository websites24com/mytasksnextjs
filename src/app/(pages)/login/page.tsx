// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  // State to store user input (email + password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to show error messages
  const [error, setError] = useState('');

  // State to disable form while submitting
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // This function runs when the user submits the form
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser refresh
    setLoading(true);
    setError('');

    // Call NextAuth signIn function using "credentials" provider
    const res = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });

    if (res?.error) {
      // If login failed → show error
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      // If login succeeded → redirect to homepage (or dashboard)
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Show error if present */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
