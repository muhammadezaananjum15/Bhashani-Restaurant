'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Navigation, Info, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #060a17 0%, #070c1a 100%)',
        paddingTop: '50px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-gold"
        style={{ width: '550px', height: '550px', top: '-80px', right: '-100px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '0px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="grid-pattern"
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="section-badge" style={{ marginBottom: '16px' }}>
            <Sparkles size={12} />
            <span>Orangi Town, Karachi</span>
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
            Location &amp;{' '}
            <span className="gradient-text-gold">Delivery Dispatch</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '580px',
              margin: '0 auto',
              fontSize: '0.96rem',
              lineHeight: 1.7,
            }}
          >
            Visit our restaurant for dine-in or takeaway, or call our delivery hotline for prompt service
            across Karachi.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* ── Details Card ── */}
          <div
            className="prestige-card"
            style={{
              padding: '38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Brand Name */}
              <div style={{ marginBottom: '30px' }}>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {RESTAURANT_INFO.name}
                </h3>
                <span className="urdu-text" style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>
                  {RESTAURANT_INFO.urduName}
                </span>
                <hr className="divider-gold" style={{ marginTop: '18px' }} />
              </div>

              {/* Info Rows */}
              {[
                {
                  icon: <MapPin size={19} />,
                  badgeBg: 'var(--gold-dim)',
                  badgeBorder: 'var(--gold-border)',
                  iconColor: 'var(--gold)',
                  label: 'Physical Address',
                  value: RESTAURANT_INFO.address,
                  isLink: false,
                },
                {
                  icon: <Phone size={19} />,
                  badgeBg: 'var(--emerald-dim)',
                  badgeBorder: 'rgba(37,211,102,0.3)',
                  iconColor: 'var(--emerald)',
                  label: 'Order Hotline & WhatsApp',
                  value: RESTAURANT_INFO.phone,
                  isLink: true,
                  href: `tel:${RESTAURANT_INFO.phoneClean}`,
                },
                {
                  icon: <Clock size={19} />,
                  badgeBg: 'rgba(255,255,255,0.05)',
                  badgeBorder: 'var(--border-glass)',
                  iconColor: 'var(--text-secondary)',
                  label: 'Service Hours',
                  value: RESTAURANT_INFO.hours,
                  isLink: false,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}
                >
                  <div
                    className="icon-badge"
                    style={{
                      background: row.badgeBg,
                      border: `1px solid ${row.badgeBorder}`,
                      color: row.iconColor,
                    }}
                  >
                    {row.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        marginBottom: '4px',
                      }}
                    >
                      {row.label}
                    </div>
                    {row.isLink ? (
                      <a
                        href={row.href}
                        style={{
                          color: 'var(--gold-light)',
                          fontWeight: 800,
                          fontSize: '1.15rem',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-serif)',
                        }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.94rem', lineHeight: 1.5 }}>
                        {row.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Delivery Note */}
              <div
                style={{
                  background: 'var(--gold-dim)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Info size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.86rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                  {RESTAURANT_INFO.deliveryNote}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="btn-solid-crimson"
                style={{ flex: 1, minWidth: '150px' }}
              >
                <Phone size={16} />
                <span>Call Hotline</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan%20Center!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-subtle"
                style={{ flex: 1, minWidth: '150px' }}
              >
                <MessageSquare size={16} />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* ── Map Card ── */}
          <div
            className="prestige-card"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ flex: 1, minHeight: '360px', width: '100%', position: 'relative' }}>
              <iframe
                title="Bhashani Pakwan Center Location Map"
                src="https://maps.google.com/maps?q=Akbar+Shaheed+Chowk+Sector+14+A+Orangi+Town+Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px', display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Footer */}
            <div
              style={{
                padding: '18px 22px',
                background: 'linear-gradient(135deg, #111b38, #0c142b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-glass)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--gold)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Akbar Shaheed Chowk
                </span>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  Sector 14/A, Orangi Town, Karachi
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Akbar+Shaheed+Chowk+Sector+14+A+Orangi+Town+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <Navigation size={14} />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
