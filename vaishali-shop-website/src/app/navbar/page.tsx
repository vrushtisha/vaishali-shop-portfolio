'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 

interface TokenPayload {
  email: string;
  role: string;
  name?: string; 
}

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const updateAuthState = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.role === 'admin');
        setUserName(decoded.name || null);
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserName(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName(null);
    }
  };

  useEffect(() => {
    updateAuthState();

    const handleAuthChange = () => updateAuthState();
    window.addEventListener('authChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    window.location.href = '/';
  };


  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

 
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link href="/" className="navbar-brand">Modicare</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          {isAdmin && (
  <li className="nav-item dropdown" style={{ position: 'relative' }}>
    <button
      className="nav-link btn btn-link dropdown-toggle"
      style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
      onClick={() => {
        const dropdown = document.getElementById('admin-dropdown');
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      }}
      aria-haspopup="true"
      aria-expanded="false"
    >
      Dashboard
    </button>
    <ul
      id="admin-dropdown"
      className="dropdown-menu"
      style={{
        display: 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '0.5rem 0',
        minWidth: '160px',
        zIndex: 1000,
      }}
      onMouseLeave={() => {
        const dropdown = document.getElementById('admin-dropdown');
        if (dropdown) dropdown.style.display = 'none';
      }}
    >
      <li>
        <Link href="/dashboard/contacts" className="dropdown-item" onClick={() => {
          const dropdown = document.getElementById('admin-dropdown');
          if (dropdown) dropdown.style.display = 'none';
        }}>
          Contact Details
        </Link>
      </li>
      <li>
        <Link href="/dashboard/userinfo" className="dropdown-item" onClick={() => {
          const dropdown = document.getElementById('admin-dropdown');
          if (dropdown) dropdown.style.display = 'none';
        }}>
          Logged In Info
        </Link>
      </li>
    </ul>
  </li>
)}


          <li className="nav-item">
            <a href="#products" onClick={scrollToProducts} className="nav-link" style={{ cursor: 'pointer' }}>
              Buy Products
            </a>
          </li>

          <li className="nav-item">
            <a href="#contact" onClick={scrollToContact} className="nav-link" style={{ cursor: 'pointer' }}>
              Contact
            </a>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item d-flex align-items-center me-3">
            
                <span style={{ fontSize: '1.2rem', marginRight: '6px' }}>👤</span>
                <span>{userName}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link href="/signup" className="nav-link">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
