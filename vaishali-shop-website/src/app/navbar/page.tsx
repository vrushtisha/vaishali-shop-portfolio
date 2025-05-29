'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaBars, FaTimes } from 'react-icons/fa';

interface TokenPayload {
  email: string;
  role: string;
  name?: string;
}

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Admin dropdown toggle for desktop
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 position-relative">
      <Link href="/" className="navbar-brand">
        Modicare
      </Link>
      {/* Hamburger for small screens */}
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Menu */}
      <div className="collapse navbar-collapse d-none d-lg-block">
        <ul className="navbar-nav ms-auto align-items-center">
          {isAdmin && (
            <li
              className="nav-item dropdown"
              style={{ position: 'relative' }}
              onMouseEnter={() => setAdminDropdownOpen(true)}
              onMouseLeave={() => setAdminDropdownOpen(false)}
            >
              <button
                className="nav-link btn btn-link dropdown-toggle"
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                }}
                aria-haspopup="true"
                aria-expanded={adminDropdownOpen}
                onClick={() => setAdminDropdownOpen((open) => !open)}
                type="button"
              >
                Dashboard
              </button>
              <ul
                className="dropdown-menu"
                style={{
                  display: adminDropdownOpen ? 'block' : 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '0.5rem 0',
                  minWidth: '160px',
                  zIndex: 1000,
                }}
              >
                <li>
                  <Link
                    href="/dashboard/contacts"
                    className="dropdown-item"
                    onClick={() => setAdminDropdownOpen(false)}
                  >
                    Contact Details
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/userinfo"
                    className="dropdown-item"
                    onClick={() => setAdminDropdownOpen(false)}
                  >
                    Logged In Info
                  </Link>
                </li>
              </ul>
            </li>
          )}

          <li className="nav-item">
            <a
              href="#products"
              onClick={scrollToProducts}
              className="nav-link"
              style={{ cursor: 'pointer' }}
            >
              Buy Products
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="nav-link"
              style={{ cursor: 'pointer' }}
            >
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
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="d-lg-none position-absolute top-100 start-0 w-100 bg-light shadow"
          style={{ zIndex: 2000 }}
        >
          <ul className="navbar-nav flex-column align-items-start p-3">
            {isAdmin && (
              <li className="nav-item mb-2">
                <details>
                  <summary className="nav-link" style={{ cursor: 'pointer' }}>
                    Dashboard
                  </summary>
                  <ul className="list-unstyled ms-3">
                    <li>
                      <Link
                        href="/dashboard/contacts"
                        className="dropdown-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/userinfo"
                        className="dropdown-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Logged In Info
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            )}
            {isLoggedIn ? (
              <>
                <li className="nav-item d-flex align-items-center mb-2">
                  <span style={{ fontSize: '1.2rem', marginRight: '6px' }}>👤</span>
                  <span>{userName}</span>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="#products"
                    onClick={scrollToProducts}
                    className="nav-link"
                  >
                    Buy Products
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="nav-link"
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <Link
                    href="/login"
                    className="nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    href="/signup"
                    className="nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="#products"
                    onClick={scrollToProducts}
                    className="nav-link"
                  >
                    Buy Products
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="nav-link"
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}