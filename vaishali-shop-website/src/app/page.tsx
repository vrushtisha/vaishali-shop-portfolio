'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', number: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phone = formData.number.trim();

    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const res = await fetch('api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', number: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  const handleShopVisit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.open('https://shop.modicare.com/92701402', '_blank');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Head>
        <title>Vaishali Shah | Modicare Mentor & Shop</title>
        <meta
          name="description"
          content="Vaishali Shah - Senior Executive Director at Modicare. Visit the shop or join the journey to financial freedom with Modicare."
        />
        <meta
          name="keywords"
          content="Modicare, Vaishali Shah, Modicare Shop, Join Modicare, Direct Selling India, Entrepreneurs"
        />
        <meta name="author" content="Vaishali Shah" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="bg-white text-dark py-5">
        <div className="container">
          <div className="alert alert-success text-center">
            🚀 Want to earn from home? Contact <strong>Vaishali Shah</strong> at 📞 <strong>87582 74909</strong> or chat on WhatsApp below!
          </div>

          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success">Vaishali Shah</h1>
            <p className="fs-5">Senior Executive Director, Modicare</p>

            <img
              src="/vaishali.jpg"
              alt="Vaishali Shah"
              className="rounded-circle img-thumbnail shadow-sm mb-3"
              style={{ width: '180px', height: '180px', objectFit: 'cover' }}
            />
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center">
              <p className="lead">
                From a dedicated housewife to a successful entrepreneur, Vaishali Shah has transformed her life through
                <strong> Modicare</strong>. Passion, resilience, and vision have helped hundreds build their own businesses.
              </p>
              <p>
                Achieved <strong>all-expense-paid luxury trips</strong> to <strong>Dubai</strong>, <strong>Thailand</strong>,
                and <strong>Pattaya</strong> — all through outstanding performance in <strong>Modicare</strong>.
              </p>
              <p>
                This story proves that anyone—regardless of background—can create financial freedom with the right guidance.
              </p>
            </div>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">🏆 Achievements</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Earned Modicare-sponsored luxury trips to Dubai, Thailand, and Pattaya</li>
                    <li className="list-group-item">Built a thriving Modicare network across India</li>
                    <li className="list-group-item">Mentored 100+ new entrepreneurs</li>
                    <li className="list-group-item">Maintained 200+ loyal customers through trust and consistent service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

       
          <div className="text-center mb-4" id="products">
            <a
              href="#"
              onClick={handleShopVisit}
              className="btn btn-lg btn-success px-5 py-2"
            >
              🛍️ Visit the Modicare Shop
            </a>
          </div>

          
          <div id="contact" className="row justify-content-center">
            <div className="col-md-6">
              <h4 className="text-success">💬 Contact to Join</h4>
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="border p-3 rounded bg-light"
              >
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="number"
                    className="form-control"
                    required
                    maxLength={10}
                    value={formData.number}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setFormData({ ...formData, number: val });
                      }
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
              </form>

              {status && <div className="alert alert-info mt-3">{status}</div>}

              <div className="text-center mt-3">
                <a
                  href="https://wa.me/918758274909"
                  className="btn btn-outline-success"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 text-muted small">
            © {new Date().getFullYear()} Vaishali Shah. All rights reserved.
          </div>
        </div>
      </main>
    </>
  );
}
