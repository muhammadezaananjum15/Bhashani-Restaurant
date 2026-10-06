'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Clock, ArrowUp, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#040710',
        color: '#cbd5e1',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 163, 89, 0.15)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', top: '-60px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '350px', height: '350px', bottom: '0', right: '-60px', zIndex: 0 }}
      />

      {/* Main Footer Content */}
      <div
        className="container-custom"
        style={{ position: 'relative', zIndex: 10, paddingTop: '50px', paddingBottom: '30px' }}
      >
        {/* Top divider */}
        <hr className="divider-gold" style={{ marginBottom: '52px' }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '44px',
            marginBottom: '52px',
          }}
        >
          {/* ── Brand Identity ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1.5px solid var(--gold-border)',
                  backgroundColor: '#080e22',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Bhashani Pakwan Center"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div>
                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '1.22rem',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  Bhashani{' '}
                  <span className="gradient-text-gold" style={{ fontWeight: 400 }}>
                    Pakwan
                  </span>
                </h3>
                <span className="urdu-text" style={{ fontSize: '0.95rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {RESTAURANT_INFO.urduName}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '18px' }}>
              Karachi&apos;s proud kitchen for authentic charcoal B.B.Q, crunchy broast, mega zinger burgers,
              and royal chicken handi — since day one.
            </p>

            <div
              style={{
                fontSize: '0.88rem',
                color: 'var(--gold-light)',
                fontStyle: 'italic',
                fontWeight: 700,
                padding: '10px 0',
                borderLeft: '2px solid var(--gold-border)',
                paddingLeft: '14px',
              }}
            >
              &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
            </div>
          </div>

          {/* ── Site Navigation ── */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 800,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--crimson), var(--gold))',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Full Menu & Prices' },
                { href: '/deals', label: 'Hot Deals (1–5)', highlight: true },
                { href: '/about', label: 'Our Story & Craft' },
                { href: '/contact', label: 'Location & Delivery' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: link.highlight ? 'var(--gold-light)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontWeight: link.highlight ? 700 : 500,
                      transition: 'color 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {link.highlight && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--gold)',
                          display: 'inline-block',
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Details ── */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 800,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--crimson), var(--gold))',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              Contact Dispatch
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div className="icon-badge icon-badge-gold" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                  <MapPin size={16} />
                </div>
                <span style={{ lineHeight: 1.6, paddingTop: '2px' }}>{RESTAURANT_INFO.address}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="icon-badge icon-badge-emerald" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                  <Phone size={16} />
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  style={{
                    color: 'var(--gold-light)',
                    fontWeight: 800,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                  }}
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="icon-badge" style={{ width: '36px', height: '36px', flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)' }}>
                  <Clock size={16} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>{RESTAURANT_INFO.hours}</span>
              </div>

              <div
                style={{
                  background: 'var(--gold-dim)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  color: 'var(--gold-light)',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
              >
                {RESTAURANT_INFO.deliveryNote}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="divider-subtle" style={{ marginBottom: '24px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()}{' '}
            <strong style={{ color: 'var(--text-secondary)' }}>{RESTAURANT_INFO.name}</strong>
            . All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Made with <Heart size={13} style={{ color: 'var(--crimson)' }} fill="currentColor" /> in Karachi
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              background: 'var(--gold-dim)',
              border: '1px solid var(--gold-border)',
              borderRadius: 'var(--r-sm)',
              width: '38px',
              height: '38px',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s var(--ease-smooth)',
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
