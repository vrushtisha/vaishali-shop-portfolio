// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaishali Shah - Modicare Consultant & Portfolio',
  description: 'Join Modicare, shop wellness products, and explore business opportunities with Vaishali Shah. Trusted Modicare direct seller.',
  keywords: [
    'Vaishali Shah',
    'Modicare',
    'Modicare Consultant',
    'Join Modicare',
    'Modicare Products',
    'Wellness Products India',
    'Modicare Shop Online',
    'Modicare Business Opportunity',
    'Modicare Direct Seller',
  ],
  authors: [{ name: 'Vaishali Shah' }],
  creator: 'Vaishali Shah',
  robots: 'index, follow',
  openGraph: {
    title: 'Vaishali Shah - Modicare Consultant & Portfolio',
    description: 'Explore Modicare products and business opportunities with Vaishali Shah.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Vaishali Shah Modicare',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
