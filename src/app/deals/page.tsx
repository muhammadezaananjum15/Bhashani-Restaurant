import type { Metadata } from 'next';
import { HotDealsSection } from '@/components/HotDealsSection';
import { FlyersSection } from '@/components/FlyersSection';

export const metadata: Metadata = {
  title: 'Hot Deals & Combos | Bhashani Pakwan Center',
  description: 'Special Value Deals 1 to 5 from Bhashani Pakwan Center flyer. Zinger burgers, crispy broast, beef burgers, club sandwiches and soft drinks at discounted combo rates.',
};

export default function DealsPage() {
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
            Special Value Combinations
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
            Hot Deals &amp; Family Feasts
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto', fontSize: '0.96rem' }}>
            Enjoy our most popular combos prepared fresh to order. Generous savings on our signature Zinger burgers, broast, and sandwiches.
          </p>
        </div>
      </div>

      <HotDealsSection isPage={true} />
      <FlyersSection />
    </div>
  );
}
