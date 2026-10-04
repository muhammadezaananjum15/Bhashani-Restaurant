'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu & Prices', href: '/menu' },
    { label: 'Hot Deals', href: '/deals' },
    { label: 'Our Story', href: '/about' },
    { label: 'Location & Contact', href: '/contact' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      {/* Top Utility Bar */}
      <div
        style={{
          backgroundColor: '#050914',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '8px 0',
          fontSize: '0.82rem',
          color: '#94a3b8',
        }}
      >
        <div
          className="container-custom"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Orangi Town, Sector-14/A, Karachi</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Open Daily: 4:00 PM – 3:00 AM</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              style={{
                color: '#f8fafc',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
            >
              <Phone size={13} style={{ color: '#d4a359' }} />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="urdu-text" style={{ color: '#d4a359', fontSize: '1rem', fontWeight: 600 }}>
              {RESTAURANT_INFO.urduName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        style={{
          backgroundColor: 'rgba(8, 14, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '12px 0',
        }}
      >
        <div
          className="container-custom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Identity */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(212, 163, 89, 0.5)',
                background: '#040711',
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Bhashani Pakwan Center"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                Bhashani <span style={{ color: '#d4a359', fontWeight: 400 }}>Pakwan</span>
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                Fast Food & B.B.Q
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? '#d4a359' : '#cbd5e1',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.01em',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#d4a359',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              <ShoppingBag size={19} style={{ color: totalItems > 0 ? '#d4a359' : '#ffffff' }} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#b81522',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    width: '19px',
                    height: '19px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ffffff',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan%20Center!%20I%20would%20like%20to%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-subtle"
              style={{ display: 'none' }}
              id="header-order-btn"
            >
              <span>Order via WhatsApp</span>
              <ArrowUpRight size={15} />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="mobile-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: '#0a1024',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px 24px',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: pathname === link.href ? '#d4a359' : '#e2e8f0',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan%20Center!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-subtle"
                style={{ width: '100%' }}
              >
                <span>WhatsApp Order ({RESTAURANT_INFO.phone})</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-btn {
            display: none !important;
          }
          #header-order-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
