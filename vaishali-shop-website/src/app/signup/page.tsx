'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Signup successful! Please login.');
        setFormData({ name: '', email: '', password: '' });

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err); // <-- used err here
      setError('Signup failed. Try again later.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>

      <div className="text-center mt-3">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-primary" style={{ cursor: 'pointer' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
