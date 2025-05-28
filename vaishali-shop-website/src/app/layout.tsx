// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar/page';

export const metadata = {
  title: 'Vaishali Shah - Modicare Portfolio',
  description: 'Join Modicare or shop online with Vaishali Shah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
