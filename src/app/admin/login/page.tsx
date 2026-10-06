'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, ChefHat } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn, user, isAdmin, loading } = useAuth();
  const router = useRouter();

  // If already logged in and is admin, redirect to /admin
  React.useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both admin email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      // Auth state listener in AuthContext will update userProfile and role
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid administrator credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: '#050914',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dark royal ambient glow */}
      <div
        className="ambient-orb orb-gold"
        style={{ width: '500px', height: '500px', top: '-100px', right: '-100px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-80px', left: '-80px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '450px', width: '100%' }}>
        <div
          className="prestige-card"
          style={{
            padding: '38px 32px',
            borderRadius: '16px',
            backgroundColor: 'rgba(10, 16, 38, 0.96)',
            border: '1.5px solid rgba(212, 163, 89, 0.4)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8), var(--shadow-gold)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,163,89,0.25), rgba(184,21,34,0.3))',
                border: '2px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--gold-light)',
              }}
            >
              <ShieldCheck size={30} />
            </div>

            <span
              style={{
                color: 'var(--gold)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Management Portal
            </span>
            <h1
              className="font-serif"
              style={{
                color: '#ffffff',
                fontSize: '1.85rem',
                fontWeight: 800,
                marginBottom: '8px',
              }}
            >
              Restaurant Admin Login
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Authorized restaurant owner access for live order dispatch and status management.
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(184, 21, 34, 0.15)',
                border: '1px solid rgba(184, 21, 34, 0.4)',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                color: '#fca5a5',
                fontSize: '0.86rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
              <div>{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Admin Email */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admin Email
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(4, 7, 18, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0 14px',
                }}
              >
                <Mail size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bhashanipakwan.com"
                  required
                  autoComplete="email"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '12px 0',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                  }}
                />
              </div>
            </div>

            {/* Admin Password */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admin Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(4, 7, 18, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0 14px',
                }}
              >
                <Lock size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '12px 0',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-solid-crimson"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.95rem',
                justifyContent: 'center',
                marginTop: '10px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: '26px',
              paddingTop: '18px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
            }}
          >
            Looking for regular customer ordering?{' '}
            <Link href="/login" style={{ color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 600 }}>
              Customer Sign In
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          🔐 Protected by Firestore Role-Based Access Controls
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '85vh', backgroundColor: '#050914' }} />}>
      <AdminLoginForm />
    </Suspense>
  );
}
