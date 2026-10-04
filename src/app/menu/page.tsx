import type { Metadata } from 'next';
import { MenuSection } from '@/components/MenuSection';
import { FlyersSection } from '@/components/FlyersSection';

export const metadata: Metadata = {
  title: 'Full Menu & Rates | Bhashani Pakwan Center Karachi',
  description: 'Explore the full menu of Bhashani Pakwan Center. Sandwiches, Rolls, Charcoal B.B.Q, Karahi, Handi, Fast Food, Biryani and Chinese dishes with exact prices.',
};

export default function MenuPage() {
  return (
    <div>
      {/* Page Banner with Food Atmosphere */}
      <div
        style={{
          backgroundColor: '#0a1024',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '60px 0 35px',
          textAlign: 'center',
          position: 'relative',
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
            Direct From Takeaway Flyers
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
            Complete Restaurant Menu
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto', fontSize: '0.96rem' }}>
            Browse through all authentic items, sizes, and combos. Select your favorites to build your order or order directly on WhatsApp.
          </p>
        </div>
      </div>

      <MenuSection isPage={true} />
      <FlyersSection />
    </div>
  );
}
