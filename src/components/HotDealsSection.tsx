'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag, MessageCircle, Zap } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

interface HotDealsProps {
  isPage?: boolean;
}

export const HotDealsSection: React.FC<HotDealsProps> = ({ isPage = false }) => {
  const { addToCart } = useCart();
  const deals = MENU_ITEMS.filter((item) => item.category === 'deals');

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0a0e1e 0%, #0c142b 30%, #0c142b 100%)',
        paddingTop: isPage ? '60px' : '40px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '600px', height: '600px', top: '-80px', right: '-150px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '400px', height: '400px', bottom: '100px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="grid-pattern"
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, paddingBottom: '90px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="section-badge" style={{ marginBottom: '16px' }}>
            <Zap size={12} />
            <span>Special Value Combinations</span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '14px',
            }}
          >
            Chef&apos;s{' '}
            <span className="gradient-text-flame">Hot Deals</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '0.96rem', lineHeight: 1.7 }}>
            Curated combinations from our printed flyer featuring signature Zinger burgers, crispy broast,
            club sandwiches, and chilled beverages.
          </p>
        </div>

        {/* Deals Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
            gap: '24px',
          }}
        >
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="prestige-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Card Banner */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #111b38, #0c142b)',
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border-glass)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--r-xs)',
                      background: 'linear-gradient(135deg, var(--crimson), #9b1020)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: '#ffffff',
                    }}
                  >
                    {String(deal.dealNumber).padStart(2, '0')}
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                    HOT DEAL
                  </span>
                </div>

                <div className="font-serif" style={{ color: 'var(--gold-light)', fontWeight: 900, fontSize: '1.28rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 500, marginRight: '2px' }}>Rs.</span>
                  {deal.price}
                </div>
              </div>

              {/* Deal Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '195px',
                  backgroundColor: '#070c1a',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s var(--ease-smooth)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(7,12,26,0.8) 100%)',
                  }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '1.08rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {deal.name}
                </h3>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}
                >
                  {deal.description}
                </p>

                {/* Items Breakdown */}
                {deal.includes && (
                  <div
                    style={{
                      background: 'rgba(212,163,89,0.05)',
                      border: '1px solid rgba(212,163,89,0.15)',
                      borderRadius: 'var(--r-sm)',
                      padding: '12px 14px',
                      marginBottom: '20px',
                    }}
                  >
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {deal.includes.map((inc, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '9px',
                            fontSize: '0.84rem',
                            color: '#e2e8f0',
                          }}
                        >
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: 'var(--gold-dim)',
                              border: '1px solid var(--gold-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Check size={11} style={{ color: 'var(--gold)' }} />
                          </div>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => addToCart(deal)}
                    className="btn-solid-crimson"
                    style={{ flex: 1, padding: '10px 16px', fontSize: '0.88rem' }}
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Cart</span>
                  </button>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan!%20I%20want%20to%20order%20${encodeURIComponent(deal.name)}%20(Rs.%20${deal.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-subtle"
                    style={{ padding: '0 14px' }}
                    title="Order via WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        {!isPage && (
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <Link href="/menu" className="btn-outline-gold">
              <span>Explore All 100+ Menu Items</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* ── Wave Curvature Divider ── */}
      {!isPage && (
        <div className="wave-divider">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0,55 C280,110 560,15 840,70 C1000,105 1200,25 1440,50 L1440,120 L0,120 Z"
              fill="#080d1e"
            />
            <path
              d="M0,55 C280,110 560,15 840,70 C1000,105 1200,25 1440,50"
              className="wave-stroke"
            />
            <path
              d="M0,75 C350,120 700,25 1050,78 C1200,108 1350,42 1440,65"
              stroke="rgba(184, 21, 34, 0.1)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      )}
    </section>
  );
};
