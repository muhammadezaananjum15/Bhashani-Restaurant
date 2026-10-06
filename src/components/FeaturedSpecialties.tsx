'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

export const FeaturedSpecialties: React.FC = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const featuredIds = ['bbq-beef-bihari-boti', 'bbq-malai-tikka', 'ff-broast-chest', 'ff-zinger-burger'];
  const featuredItems = MENU_ITEMS.filter((item) => featuredIds.includes(item.id));

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #060a17 0%, #0c142b 40%, #0c142b 100%)',
        paddingTop: '50px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-gold"
        style={{ width: '500px', height: '500px', top: '-60px', left: '-100px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '50px', right: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, paddingBottom: '90px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div className="section-badge" style={{ marginBottom: '14px' }}>
              <Star size={12} />
              <span>Signatures &amp; Favorites</span>
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#ffffff',
                fontWeight: 900,
                lineHeight: 1.1,
              }}
            >
              Chef&apos;s{' '}
              <span className="gradient-text-gold">Recommendations</span>
            </h2>
          </div>

          <Link href="/menu" className="btn-outline-gold" style={{ padding: '9px 20px', fontSize: '0.86rem' }}>
            <span>Explore All Dishes</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Feature Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
            gap: '24px',
          }}
        >
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="prestige-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  backgroundColor: '#050914',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s var(--ease-smooth)' }}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 55%, rgba(7,12,26,0.95) 100%)',
                  }}
                />
                {/* Top badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(7,12,26,0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  ★ Chef&apos;s Pick
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    marginBottom: '7px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.84rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-glass)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '1px',
                      }}
                    >
                      Price
                    </span>
                    <div
                      className="font-serif"
                      style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold-light)' }}
                    >
                      <span style={{ fontSize: '0.78rem', fontWeight: 500, marginRight: '2px' }}>Rs.</span>
                      {item.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className="btn-solid-crimson"
                    style={{
                      padding: '9px 18px',
                      fontSize: '0.84rem',
                      backgroundColor: addedId === item.id ? '#1a6f44' : undefined,
                    }}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check size={14} />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Order</span>
                      </>
                    )}
                  </button>
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
            d="M0,40 C200,95 400,5 600,60 C800,115 1000,15 1200,65 C1300,88 1380,45 1440,38 L1440,120 L0,120 Z"
            fill="#0a0e1e"
          />
          <path
            d="M0,40 C200,95 400,5 600,60 C800,115 1000,15 1200,65 C1300,88 1380,45 1440,38"
            className="wave-stroke"
          />
          <path
            d="M0,60 C300,105 600,20 900,72 C1100,110 1300,35 1440,55"
            stroke="rgba(184, 21, 34, 0.12)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};
