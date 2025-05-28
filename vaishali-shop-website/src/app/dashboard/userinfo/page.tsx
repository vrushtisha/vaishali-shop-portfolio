'use client';

import { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserInfoPage() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found.');
      setLoading(false);
      return;
    }

    fetch('/api/dashboard/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch user info');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Registered Users</h1>
      {users.length > 0 ? (
        <ul className="list-group" style={{ maxWidth: '600px' }}>
          {users.map((user, index) => (
            <li key={index} className="list-group-item">
              <strong>Name:</strong> {user.name}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Role:</strong> {user.role}<br />
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
