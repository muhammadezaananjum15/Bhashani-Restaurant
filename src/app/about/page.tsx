import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed, ShieldCheck, Flame, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const metadata: Metadata = {
  title: 'Our Story & Culinary Heritage | Bhashani Pakwan Center',
  description: 'Learn about Bhashani Pakwan Center in Karachi. Live charcoal B.B.Q, traditional handi karahi recipes, and commitment to fresh halal meat.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#070c1a', color: '#f8fafc' }}>
      {/* Header Banner */}
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
            Since Decades in Karachi
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
            The Bhashani Heritage
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto', fontSize: '0.96rem' }}>
            Built on culinary honesty, live charcoal fire, and the authentic spices of Karachi.
          </p>
        </div>
      </div>

      {/* Main Narrative Section */}
      <div className="container-custom" style={{ padding: '70px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center',
          }}
        >
          {/* Visual Presentation */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '460px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 163, 89, 0.3)',
              }}
            >
              <Image
                src="/images/banners/Picture-5.webp"
                alt="Bhashani Pakwan Center Dining Experience"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

          {/* Text Story */}
          <div>
            <span className="urdu-text" style={{ fontSize: '1.4rem', color: '#d4a359', display: 'block', marginBottom: '14px' }}>
              {RESTAURANT_INFO.urduName}
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: '20px',
              }}
            >
              Crafting Memorable Flavors in the Heart of Orangi Town
            </h2>

            <p style={{ color: '#cbd5e1', lineHeight: 1.75, marginBottom: '18px', fontSize: '0.96rem' }}>
              At <strong>Bhashani Pakwan Center</strong>, located at Plot No. 32, Akbar Shaheed Chowk, Sector-14/A in Orangi Town, Karachi, we believe that real Pakistani cuisine cannot be rushed.
            </p>

            <p style={{ color: '#cbd5e1', lineHeight: 1.75, marginBottom: '18px', fontSize: '0.96rem' }}>
              Our skewered B.B.Q—including our tender Beef Bihari Boti, Chicken Malai Tikka, and Seekh Kababs—is marinated in secret house spices and cooked slowly over glowing coals. Meanwhile, our fast food kitchen turns out Karachi&apos;s crispiest broasts and thickest Zinger burgers with homemade sauces that keep our customers returning week after week.
            </p>

            <p style={{ color: '#d4a359', fontWeight: 600, fontSize: '1.1rem', marginBottom: '28px' }}>
              &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/menu" className="btn-solid-crimson">
                <UtensilsCrossed size={16} />
                <span>View Full Menu</span>
              </Link>
              <Link href="/contact" className="btn-outline-gold">
                <span>Visit Us in Karachi</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Quality */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '80px',
          }}
        >
          <div className="prestige-card" style={{ padding: '30px' }}>
            <div style={{ color: '#d4a359', marginBottom: '16px' }}>
              <Flame size={28} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '10px' }}>
              Live Charcoal Fire
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              We never use gas lava rocks for our grills. Authentic wood and charcoal coals lend that unmistakable smoky depth to every skewer.
            </p>
          </div>

          <div className="prestige-card" style={{ padding: '30px' }}>
            <div style={{ color: '#d4a359', marginBottom: '16px' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '10px' }}>
              Hand-Selected Halal Cuts
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Fresh beef undercut and prime fresh chicken delivered daily. Thoroughly washed, trimmed, and marinated under clean kitchen standards.
            </p>
          </div>

          <div className="prestige-card" style={{ padding: '30px' }}>
            <div style={{ color: '#d4a359', marginBottom: '16px' }}>
              <Clock size={28} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '10px' }}>
              Late-Night Service
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Whether dining with family at 8:00 PM or ordering late-night broast and rolls at 2:30 AM, our kitchen delivers fresh hot meals till 3:00 AM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
