// src/app/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image';
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
        <title>Vaishali Shah - Modicare Consultant in India | Buy Modicare Products Online | Join Business</title>
        <meta name="google-site-verification" content="FAXNZl9E2mAYsm1vt38_9RZ560pX0zmoqBgDa6Rl7U4" />
        <meta
          name="description"
          content="Meet Vaishali Shah, Senior Modicare Consultant in Bhuj, India. Buy Modicare wellness products online and start your Modicare business today with expert mentorship and full support."
        />
        <meta
          name="keywords"
          content="Modicare, Vaishali Shah, Modicare Bhuj, Buy Modicare Products Online, Modicare Shop, Join Modicare Business, Modicare Consultant India, Direct Seller Modicare, Modicare DP, Modicare Products Bhuj, Modicare Mentorship, Modicare Home Business, Work From Home India"
        />
        <meta name="author" content="Vaishali Shah" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vaishali Shah - Modicare Business & Products in India" />
        <meta
          property="og:description"
          content="Buy Modicare products and build your Modicare business with Vaishali Shah. Trusted Consultant in Bhuj, India with 100+ mentees."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'} />
        <meta property="og:site_name" content="Vaishali Shah Modicare India" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Vaishali Shah",
      "jobTitle": "Senior Executive Director - Modicare India",
      "url": process.env.NEXT_PUBLIC_BASE_URL || "https://vaishali-shop-portfolio.vercel.app/",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Odhav Avenue 2, Opp. Kataria Complex, Near Pramukh Swami Nagar",
        "addressLocality": "Bhuj",
        "addressRegion": "Gujarat",
        "postalCode": "370001",
        "addressCountry": "IN"
      },
      "telephone": "+918758274909",
      "image": "https://vaishali-shop-portfolio.vercel.app/vaishali.jpg",
      "description": "Meet Vaishali Shah, Senior Modicare Consultant in Bhuj, India. Buy Modicare wellness products online and start your Modicare business today with expert mentorship and full support."
    }),
  }}
/>

      </Head>

      <main className="bg-white text-dark py-5">
        <div className="container">
          <div className="alert alert-success text-center">
            🚀 Want to earn from home? Contact <strong>Vaishali Shah</strong> at 📞 <strong>87582 74909</strong> or chat on WhatsApp below!
          </div>

          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success">Vaishali Shah</h1>
            <h2 className="fs-5">Senior Executive Director - Modicare India</h2>

            <Image
              src="/vaishali.jpg"
              alt="Vaishali Shah - Modicare Consultant Bhuj"
              width={180}
              height={180}
              className="rounded-circle img-thumbnail shadow-sm mb-3"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center">
              <h3 className="text-success">💼 Modicare Success Story</h3>
              <p className="lead">
                From a homemaker to a top Modicare entrepreneur, <strong>Vaishali Shah</strong> is now a leading consultant in Bhuj, India. Her journey proves the power of passion and proper mentorship.
              </p>
              <p>
                She has earned <strong>international Modicare trips</strong> to Dubai, Thailand, and Pattaya through her outstanding business performance.
              </p>
              <p>
                Join Modicare under her <strong>step-by-step mentorship</strong> and transform your life with India’s most trusted direct-selling opportunity.
              </p>
            </div>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-success">🏆 Modicare Achievements</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">All-expense-paid luxury trips to Dubai, Thailand & Pattaya</li>
                    <li className="list-group-item">Built a 1000+ member strong Modicare network across India</li>
                    <li className="list-group-item">Mentored 100+ entrepreneurs to start their Modicare journey</li>
                    <li className="list-group-item">Retained 200+ loyal customers through personalized service</li>
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
              aria-label="Shop Modicare Products"
            >
              🛍️ Shop Modicare Products Online
            </a>
          </div>

          <div id="contact" className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="text-success">📩 Contact to Join Modicare</h3>
              <form onSubmit={handleSubmit} method="POST" className="border p-3 rounded bg-light">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="number" className="form-label">Phone Number</label>
                  <input
                    id="number"
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
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-success" aria-label="Submit contact form">Submit</button>
              </form>

              {status && <div className="alert alert-info mt-3">{status}</div>}

              <div className="text-center mt-4">
                <p className="mb-2 fw-bold">📍 Address</p>
                <p>
                  Odhav Avenue 2,<br />
                  Opp. Kataria Complex,<br />
                  Near Pramukh Swami Nagar,<br />
                  Bhuj, Gujarat, India - 370001
                </p>

                <a
                  href="https://wa.me/918758274909"
                  className="btn btn-outline-success mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp with Vaishali Shah"
                >
                  💬 Chat on WhatsApp with Vaishali
                </a>
              </div>
            </div>
          </div>

          <footer className="text-center mt-5 text-muted small">
            © {new Date().getFullYear()} Vaishali Shah - Modicare Consultant India. All rights reserved.
          </footer>
        </div>
      </main>
    </>
  );
}
