'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { signIn, error, clearError, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      router.push(redirect);
    } catch (err: any) {
      setFormError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#070c1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow orbs */}
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '450px', height: '450px', top: '-80px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-gold"
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-60px', zIndex: 0 }}
      />

      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '460px',
          width: '100%',
        }}
      >
        <div
          className="prestige-card"
          style={{
            padding: '38px 32px',
            borderRadius: '16px',
            backgroundColor: 'rgba(11, 18, 42, 0.94)',
            border: '1px solid rgba(212, 163, 89, 0.25)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(184,21,34,0.2), rgba(212,163,89,0.2))',
                border: '1.5px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--gold-light)',
              }}
            >
              <LogIn size={24} />
            </div>

            <h1
              className="font-serif"
              style={{
                color: '#ffffff',
                fontSize: '1.85rem',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              Customer Sign In
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Sign in to place orders, track live deliveries &amp; view your history.
            </p>
          </div>

          {/* Alert Message */}
          {(formError || error) && (
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
              <div>{formError || error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Field */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(5, 9, 20, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0 14px',
                  transition: 'border-color 0.2s',
                }}
              >
                <Mail size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Password
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
                <Lock size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                    fontFamily: 'inherit',
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-solid-crimson"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.94rem',
                justifyContent: 'center',
                marginTop: '10px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
            }}
          >
            Don&apos;t have an account yet?{' '}
            <Link
              href={`/register${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              style={{
                color: 'var(--gold-light)',
                fontWeight: 700,
                textDecoration: 'none',
                marginLeft: '4px',
              }}
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Security disclaimer */}
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <ShieldCheck size={14} style={{ color: 'var(--gold)' }} />
          <span>Protected with Firebase Authentication &amp; Firestore Security Rules</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: '#070c1a' }} />}>
      <LoginForm />
    </Suspense>
  );
}
