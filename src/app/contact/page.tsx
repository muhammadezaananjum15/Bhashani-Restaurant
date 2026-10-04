import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';
import { FlyersSection } from '@/components/FlyersSection';

export const metadata: Metadata = {
  title: 'Location, Contact & Delivery | Bhashani Pakwan Center',
  description: 'Visit Bhashani Pakwan Center at Plot No. 32, Akbar Shaheed Chowk, Sector-14/A, Orangi Town, Karachi or call +92 314 511 83 38 for delivery.',
};

export default function ContactPage() {
  return (
    <div>
      <div
        style={{
          backgroundColor: '#0a1024',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '60px 0 35px',
          textAlign: 'center',
        }}
      >
        <div className="container-custom">
          <span
            style={{
              color: '#d4a359',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Orangi Town, Karachi
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            Find Us &amp; Order Delivery
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto', fontSize: '0.96rem' }}>
            We look forward to serving you. Stop by our restaurant or contact our delivery dispatch for hot meals delivered to your door.
          </p>
        </div>
      </div>

      <ContactSection />
      <FlyersSection />
    </div>
  );
}
