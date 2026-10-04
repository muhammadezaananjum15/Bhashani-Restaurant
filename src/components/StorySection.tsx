'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Award, HeartHandshake, ChefHat, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const StorySection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0c142b 0%, #0a1126 50%, #080e20 100%)',
        paddingTop: '40px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '500px', height: '500px', top: '-50px', right: '-100px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '400px', height: '400px', bottom: '0px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="grid-pattern"
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, paddingBottom: '90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* ── Left: Image Collage ── */}
          <div style={{ position: 'relative' }}>
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '460px',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                border: '1.5px solid rgba(184,21,34,0.35)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <Image
                src="/images/banners/Picture-5.webp"
                alt="Bhashani Pakwan Center authentic food"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(6,10,23,0.9) 100%)',
                }}
              />
              {/* Corner gold accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '80px',
                  height: '80px',
                  borderTop: '2px solid var(--gold-border)',
                  borderLeft: '2px solid var(--gold-border)',
                  borderTopLeftRadius: 'var(--r-xl)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  borderBottom: '2px solid var(--gold-border)',
                  borderRight: '2px solid var(--gold-border)',
                  borderBottomRightRadius: 'var(--r-xl)',
                }}
              />
            </div>

            {/* Floating Heritage Badge */}
            <div
              className="glass-panel animate-float"
              style={{
                position: 'absolute',
                bottom: '-28px',
                right: '-10px',
                borderRadius: 'var(--r-lg)',
                padding: '18px 22px',
                border: '1px solid var(--gold-border)',
                boxShadow: 'var(--shadow-md), var(--shadow-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                maxWidth: '300px',
                zIndex: 20,
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--crimson), #ff6a00)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 20px rgba(184,21,34,0.4)',
                }}
              >
                <ChefHat size={26} style={{ color: '#ffffff' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Authentic Taste
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  Live Charcoal Grilled BBQ
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Story & Philosophy ── */}
          <div style={{ paddingTop: '20px' }}>
            <div className="badge-flame" style={{ marginBottom: '18px' }}>
              <Sparkles size={13} />
              <span>Karachi&apos;s Culinary Heritage</span>
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.12,
                marginBottom: '12px',
              }}
            >
              The Story Behind{' '}
              <br />
              <span className="gradient-text-flame">{RESTAURANT_INFO.name}</span>
            </h2>

            <hr className="divider-gold" style={{ marginBottom: '20px' }} />

            <p className="urdu-text" style={{ fontSize: '1.2rem', color: 'var(--gold-light)', marginBottom: '18px' }}>
              بھرپور ذائقہ، تازہ گوشت اور کراچی کا اصلی مصالحہ
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '18px', fontSize: '0.97rem' }}>
              At <strong style={{ color: '#ffffff' }}>Bhashani Pakwan Center</strong>, food is more than a meal — it is an unforgettable experience.
              Established at Akbar Shaheed Chowk, Sector‑14/A in Orangi Town, Karachi, we pride ourselves on
              serving freshly marinated, authentically spiced Pakistani and fast food delicacies.
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px', fontSize: '0.97rem' }}>
              Our secret lies in live charcoal embers, fresh halal cuts, and time-honored Karachi recipes.
              Our motto has always been:
              <span
                style={{
                  color: 'var(--gold-light)',
                  fontWeight: 800,
                  display: 'block',
                  marginTop: '8px',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                }}
              >
                &ldquo;Come Hungry, Leave Happy..!!&rdquo;
              </span>
            </p>

            {/* Feature Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: '14px' }}>
              {[
                {
                  icon: <Flame size={22} />,
                  color: '#ff6a00',
                  bg: 'rgba(255, 106, 0, 0.12)',
                  border: 'rgba(255, 106, 0, 0.25)',
                  title: 'Real Charcoal Flavor',
                  desc: 'Smoky aromatic skewered BBQ grilled on live embers.',
                },
                {
                  icon: <Award size={22} />,
                  color: 'var(--gold)',
                  bg: 'var(--gold-dim)',
                  border: 'var(--gold-border)',
                  title: 'Hygienic & Fresh',
                  desc: 'Strict quality standards, fresh meat, and clean cooking oil.',
                },
                {
                  icon: <HeartHandshake size={22} />,
                  color: 'var(--emerald)',
                  bg: 'var(--emerald-dim)',
                  border: 'rgba(37,211,102,0.3)',
                  title: 'Late Night Craving',
                  desc: 'Serving hot meals and combos till 3:00 AM nightly.',
                },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: f.bg,
                    border: `1px solid ${f.border}`,
                    borderRadius: 'var(--r-md)',
                    padding: '16px',
                    transition: 'transform 0.3s var(--ease-smooth)',
                  }}
                >
                  <div style={{ color: f.color, marginBottom: '8px' }}>{f.icon}</div>
                  <h4 style={{ color: '#ffffff', fontSize: '0.93rem', fontWeight: 700, marginBottom: '4px' }}>
                    {f.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.79rem', lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Premium Curvature Divider ── */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 130" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,50 C240,110 480,10 720,70 C900,115 1100,20 1300,65 C1370,85 1420,50 1440,42 L1440,130 L0,130 Z"
            fill="#060a17"
          />
          <path
            d="M0,50 C240,110 480,10 720,70 C900,115 1100,20 1300,65 C1370,85 1420,50 1440,42"
            className="wave-stroke"
          />
          <path
            d="M0,70 C300,120 600,25 900,80 C1100,120 1300,40 1440,60"
            stroke="rgba(212, 163, 89, 0.1)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};
