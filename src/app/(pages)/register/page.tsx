'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For showing error or success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Router to redirect the user after registration
  const router = useRouter();

  // Function that runs when the form is submitted
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default page reload
    setError('');
    setSuccess('');

    try {
      // Send registration data to the API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // If registration failed, show error
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      // ✅ SUCCESS: now log in the user automatically
      const login = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (login?.error) {
        setError('Registered successfully, but auto-login failed.');
      } else {
        // ✅ Logged in successfully → redirect
        router.push('/');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Success message */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleRegister}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
