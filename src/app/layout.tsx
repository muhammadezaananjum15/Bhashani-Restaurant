import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingActions } from '@/components/FloatingActions';

export const metadata: Metadata = {
  metadataBase: new URL('https://bhashanipakwan.com'),
  title: "Bhashani Pakwan Center | Fast Food & B.B.Q - Karachi",
  description: "Bhashani Pakwan Center in Karachi. Taste the best Charcoal B.B.Q, Crispy Broast, Zinger Burgers, Chicken Karahi, Handi, Rolls & Biryani. Come Hungry, Leave Happy!!",
  keywords: [
    "Bhashani Pakwan Center",
    "Bhashani Restaurant",
    "Karachi Fast Food",
    "Karachi BBQ",
    "Orangi Town Food",
    "Chicken Karahi",
    "Handi",
    "Zinger Burger Karachi",
    "Broast Karachi"
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Bhashani Pakwan Center | Fast Food & B.B.Q",
    description: "Come Hungry, Leave Happy..! Authentic BBQ, Broast, Zinger, Karahi & Chinese. Plot No. 32, Akbar Shaheed Chowk, Sector-14/A, Orangi Town, Karachi.",
    url: 'https://bhashanipakwan.com',
    siteName: 'Bhashani Pakwan Center',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: 'Bhashani Pakwan Center Logo',
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
              <CartDrawer />
              <FloatingActions />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
