'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UtensilsCrossed, Flame, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '#040710',
      }}
    >
      {/* ── Background Image ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/banners/Picture-5.webp"
          alt="Authentic Karachi BBQ and Dining"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.28) contrast(1.2) saturate(1.2)',
          }}
        />
        {/* Multi-layer cinematic vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(7,12,26,0.3) 0%, rgba(7,12,26,0.75) 60%, #040710 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(4,7,16,0.7) 0%, transparent 35%, rgba(4,7,16,0.97) 100%)',
          }}
        />
      </div>

      {/* ── Grid Pattern Overlay ── */}
      <div
        className="grid-pattern"
        style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.4 }}
      />

      {/* ── Ambient Glow Orbs ── */}
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '600px', height: '600px', top: '-100px', left: '-150px', zIndex: 2 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '500px', height: '500px', bottom: '100px', right: '-100px', zIndex: 2 }}
      />
      <div
        className="ambient-orb orb-indigo"
        style={{ width: '400px', height: '400px', top: '40%', left: '40%', zIndex: 2 }}
      />

      {/* ── Hero Content ── */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 'clamp(80px, 12vh, 130px)',
          paddingBottom: '40px',
          margin: 'auto',
          maxWidth: '1000px',
          textAlign: 'center',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Live badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '22px',
            fontSize: '0.77rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#6fffa0',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#25d366',
              boxShadow: '0 0 8px #25d366',
              display: 'inline-block',
            }}
          />
          Open Now • 4PM – 3AM
        </div>

        {/* Urdu Calligraphy */}
        <div style={{ marginBottom: '16px' }}>
          <span
            className="urdu-text"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
              color: 'var(--gold)',
              fontWeight: 700,
              display: 'block',
              textShadow: '0 0 40px rgba(212,163,89,0.5)',
            }}
          >
            {RESTAURANT_INFO.urduName}
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            color: '#ffffff',
            marginBottom: '18px',
            textShadow: '0 4px 40px rgba(0,0,0,0.9)',
            letterSpacing: '-0.02em',
          }}
        >
          Karachi&apos;s Signature{' '}
          <br />
          <span className="gradient-text-flame" style={{ fontStyle: 'italic' }}>
            Charcoal B.B.Q
          </span>{' '}
          <span style={{ color: '#ffffff' }}>&amp;</span>{' '}
          <span className="text-gold-shimmer">Crispy Broast</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 'clamp(0.88rem, 1.5vw, 1.1rem)',
            color: '#94a3b8',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          {RESTAURANT_INFO.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            color: '#94a3b8',
            maxWidth: '660px',
            margin: '0 auto 38px',
            lineHeight: 1.8,
          }}
        >
          From live charcoal-grilled Bihari Boti and skewered Malai Tikka to crunchy
          quarter chest broasts, handi karahi, and loaded zinger burgers. Prepared fresh
          every evening at Akbar Shaheed Chowk, Orangi Town, Karachi.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/menu" className="btn-solid-crimson">
            <UtensilsCrossed size={17} />
            <span>Explore Full Menu</span>
          </Link>
          <Link href="/deals" className="btn-outline-gold">
            <Flame size={16} style={{ color: '#ff8a4c' }} />
            <span>View Hot Deals</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
            flexWrap: 'wrap',
            marginTop: '56px',
            background: 'rgba(10,17,40,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--r-xl)',
            padding: '20px 36px',
            maxWidth: '680px',
            width: '100%',
          }}
        >
          {[
            { value: '100%', label: 'Fresh Halal Meat' },
            { value: 'Live', label: 'Charcoal Fire' },
            { value: '4–3AM', label: 'Daily Service' },
            { value: '5★', label: 'Customer Rated' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <div style={{ textAlign: 'center', padding: '0 24px' }}>
                <div
                  className="font-serif"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: 'var(--gold-light)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    height: '36px',
                    background: 'rgba(255,255,255,0.1)',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Premium Wave Curvature Divider ── */}
      <div className="wave-divider" style={{ position: 'relative', zIndex: 10, marginTop: '-2px' }}>
        <svg
          viewBox="0 0 1440 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Fill wave */}
          <path
            d="M0,60 C180,110 360,20 540,75 C720,130 900,15 1080,70 C1200,105 1340,35 1440,55 L1440,130 L0,130 Z"
            fill="#0c142b"
          />
          {/* Glowing gold stroke line */}
          <path
            d="M0,60 C180,110 360,20 540,75 C720,130 900,15 1080,70 C1200,105 1340,35 1440,55"
            className="wave-stroke"
          />
          {/* Secondary subtle line */}
          <path
            d="M0,75 C200,115 400,40 600,85 C800,130 1000,30 1200,78 C1320,105 1400,52 1440,65"
            stroke="rgba(212, 163, 89, 0.1)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};
