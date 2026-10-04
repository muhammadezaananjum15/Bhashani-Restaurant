'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ZoomIn, X, FileImage } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const FlyersSection: React.FC = () => {
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);

  return (
    <section
      id="flyers"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #080d1e 0%, #0c142b 30%, #0c142b 100%)',
        paddingTop: '50px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-indigo"
        style={{ width: '500px', height: '500px', top: '-60px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '400px', height: '400px', bottom: '50px', right: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, paddingBottom: '90px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-badge" style={{ marginBottom: '16px' }}>
            <FileImage size={12} />
            <span>Authentic Takeaway Cards</span>
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 900,
              marginBottom: '12px',
              lineHeight: 1.1,
            }}
          >
            Printed{' '}
            <span className="gradient-text-gold">Menu Flyers</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '0.96rem',
              lineHeight: 1.7,
            }}
          >
            Verified takeaway rate cards of Bhashani Pakwan Center. Click on either flyer to examine
            high-resolution scans of our official menu.
          </p>
        </div>

        {/* 2 Flyer Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '32px',
            maxWidth: '980px',
            margin: '0 auto',
          }}
        >
          {RESTAURANT_INFO.flyers.map((flyer, index) => (
            <div
              key={index}
              className="prestige-card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s var(--ease-spring), box-shadow 0.4s var(--ease-smooth)',
              }}
              onClick={() => setSelectedFlyer(flyer.src)}
            >
              {/* Image area */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#050914',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={flyer.src}
                  alt={flyer.title}
                  fill
                  style={{ objectFit: 'contain', padding: '14px' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(4, 7, 16, 0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(2px)',
                    transition: 'opacity 0.3s',
                  }}
                >
                  <div
                    className="btn-solid-crimson"
                    style={{ padding: '10px 22px', fontSize: '0.86rem', pointerEvents: 'none' }}
                  >
                    <ZoomIn size={16} />
                    <span>View High-Resolution</span>
                  </div>
                </div>

                {/* Card number badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: 'rgba(7,12,26,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: 'var(--r-sm)',
                    padding: '4px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--gold-light)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Card {index + 1} / 2
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #111b38, #0c142b)',
                  borderTop: '1px solid var(--border-glass)',
                }}
              >
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.97rem', marginBottom: '3px' }}>
                    {flyer.title}
                  </h4>
                  <span style={{ fontSize: '0.76rem', color: 'var(--gold)', fontWeight: 600 }}>
                    Official Bhashani Menu Card
                  </span>
                </div>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eye size={17} style={{ color: 'var(--gold)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Wave Curvature Divider ── */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,45 C300,100 600,10 900,65 C1100,105 1280,30 1440,48 L1440,120 L0,120 Z"
            fill="#060a17"
          />
          <path
            d="M0,45 C300,100 600,10 900,65 C1100,105 1280,30 1440,48"
            className="wave-stroke"
          />
          <path
            d="M0,65 C250,110 500,25 750,75 C950,115 1150,35 1440,62"
            stroke="rgba(79, 70, 229, 0.12)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedFlyer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(4, 7, 16, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedFlyer(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedFlyer(null)}
            aria-label="Close flyer"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'linear-gradient(135deg, var(--crimson), #9b1020)',
              border: 'none',
              borderRadius: 'var(--r-sm)',
              width: '44px',
              height: '44px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: 'var(--shadow-crimson)',
              transition: 'transform 0.2s',
            }}
          >
            <X size={20} />
          </button>

          {/* Flyer Image */}
          <div
            style={{
              position: 'relative',
              width: '92vw',
              maxWidth: '900px',
              height: '88vh',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedFlyer}
              alt="High-Res Flyer Scan"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
};
