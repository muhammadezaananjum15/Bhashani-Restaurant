'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ShoppingBag, Menu, X, ArrowUpRight, User as UserIcon, LogOut, ShieldCheck, ClipboardList } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, userProfile, isAdmin, signOut } = useAuth();

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
              gap: '26px',
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

            {user && (
              <Link
                href="/orders"
                style={{
                  color: pathname === '/orders' ? '#d4a359' : '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: pathname === '/orders' ? 700 : 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'color 0.2s ease',
                }}
              >
                <ClipboardList size={15} style={{ color: '#d4a359' }} />
                <span>My Orders</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                style={{
                  color: '#f3cf8a',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(212, 163, 89, 0.15)',
                  border: '1px solid rgba(212, 163, 89, 0.4)',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} style={{ color: '#d4a359' }} />
                <span>Admin Panel</span>
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Cart Button */}
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

            {/* Auth Buttons for Desktop */}
            <div className="desktop-menu" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link
                    href="/account"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      color: '#f8fafc',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    <UserIcon size={14} style={{ color: '#d4a359' }} />
                    <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {userProfile?.name?.split(' ')[0] || 'Account'}
                    </span>
                  </Link>

                  <button
                    onClick={() => signOut()}
                    title="Sign Out"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link
                    href="/login"
                    style={{
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      padding: '8px 14px',
                      borderRadius: '6px',
                      transition: 'color 0.2s',
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="btn-solid-crimson"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.84rem',
                      textDecoration: 'none',
                    }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

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

            {/* Mobile Menu Trigger */}
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
            {/* User status card on mobile */}
            {user ? (
              <div
                style={{
                  backgroundColor: 'rgba(16, 25, 56, 0.8)',
                  border: '1px solid rgba(212, 163, 89, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem' }}>
                    {userProfile?.name || 'Customer'}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f87171',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '9px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-solid-crimson"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '9px',
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    justifyContent: 'center',
                  }}
                >
                  Register
                </Link>
              </div>
            )}

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

            {user && (
              <>
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: pathname === '/orders' ? '#d4a359' : '#e2e8f0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ClipboardList size={16} style={{ color: '#d4a359' }} />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: pathname === '/account' ? '#d4a359' : '#e2e8f0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <UserIcon size={16} style={{ color: '#d4a359' }} />
                  <span>Account Details</span>
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#f3cf8a',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(212, 163, 89, 0.12)',
                  border: '1px solid rgba(212, 163, 89, 0.3)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={16} style={{ color: '#d4a359' }} />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan%20Center!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-subtle"
                style={{ width: '100%', justifyContent: 'center' }}
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
