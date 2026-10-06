'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, ClipboardList, LogOut, Check, ShieldCheck, ArrowRight, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, userProfile, updateUserProfile, signOut, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setPhone(userProfile.phone || '');
      setAddress(userProfile.address || '');
    }
  }, [userProfile]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: '#070c1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>Loading account details...</div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setUpdateError(null);
    setSavedSuccess(false);

    try {
      await updateUserProfile({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setUpdateError(err.message || 'Failed to update profile details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: '#070c1a',
        padding: '50px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="ambient-orb orb-gold"
        style={{ width: '450px', height: '450px', top: '-80px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <span
            style={{
              color: 'var(--gold)',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Customer Dashboard
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800 }}>
                My Account
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Manage your contact details, default delivery address, and view previous orders.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/orders" className="btn-outline-gold" style={{ padding: '9px 18px', fontSize: '0.86rem' }}>
                <ClipboardList size={16} />
                <span>My Orders</span>
              </Link>
              <button
                onClick={() => signOut()}
                style={{
                  backgroundColor: 'rgba(184, 21, 34, 0.15)',
                  border: '1px solid rgba(184, 21, 34, 0.4)',
                  color: '#f87171',
                  borderRadius: '6px',
                  padding: '9px 16px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="prestige-card"
          style={{
            padding: '36px',
            backgroundColor: 'rgba(11, 18, 42, 0.94)',
            borderRadius: '16px',
            border: '1px solid rgba(212, 163, 89, 0.25)',
          }}
        >
          {savedSuccess && (
            <div
              style={{
                backgroundColor: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#86efac',
                fontSize: '0.9rem',
              }}
            >
              <Check size={18} />
              <span>Profile information successfully updated!</span>
            </div>
          )}

          {updateError && (
            <div
              style={{
                backgroundColor: 'rgba(184, 21, 34, 0.15)',
                border: '1px solid rgba(184, 21, 34, 0.4)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                color: '#fca5a5',
                fontSize: '0.9rem',
              }}
            >
              {updateError}
            </div>
          )}

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 9, 20, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0 14px',
                  }}
                >
                  <User size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      padding: '11px 0',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Email Address (Verified)
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 9, 20, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '0 14px',
                    opacity: 0.7,
                  }}
                >
                  <Mail size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      padding: '11px 0',
                      color: '#94a3b8',
                      fontSize: '0.92rem',
                      cursor: 'not-allowed',
                    }}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Delivery Contact Phone
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 9, 20, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0 14px',
                  }}
                >
                  <Phone size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0314 1234567"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      padding: '11px 0',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Account Status
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 9, 20, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    color: 'var(--gold-light)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                >
                  <ShieldCheck size={16} style={{ marginRight: '8px', color: 'var(--gold)' }} />
                  <span>{userProfile?.role || 'Customer'}</span>
                </div>
              </div>
            </div>

            {/* Default Delivery Address */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                Default Delivery Address (Orangi Town / Karachi)
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgba(5, 9, 20, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                }}
              >
                <MapPin size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', marginTop: '3px' }} />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / House number, Street, Sector, Landmark, Orangi Town"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-solid-crimson"
                style={{ padding: '11px 24px', fontSize: '0.9rem' }}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
