'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { signUp, error, clearError, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  React.useEffect(() => {
    // Only redirect if already logged in initially, not in the middle of a submission attempt
    if (user && !isSubmitting) {
      router.push(redirect);
    }
  }, [user, isSubmitting, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    // Field Validations
    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!phone.trim()) {
      setFormError('Please enter your phone or mobile number for order delivery updates.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(name, email, phone, password);
      router.push(redirect);
    } catch (err: any) {
      setFormError(err.message || 'Failed to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
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
        className="ambient-orb orb-gold"
        style={{ width: '450px', height: '450px', top: '-80px', right: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-60px', left: '-60px', zIndex: 0 }}
      />

      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '520px',
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
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
              <UserPlus size={24} />
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
              Create Customer Account
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Register once to order fast food &amp; charcoal BBQ, save delivery addresses, and track orders.
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Full Name *
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
                <User size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Muhammad Ali"
                  required
                  autoComplete="name"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '11px 0',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Email Address *
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
                    padding: '11px 0',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Mobile Number *
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
                <Phone size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0314 1234567"
                  required
                  autoComplete="tel"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '11px 0',
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
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Password (min 6 characters) *
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
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '11px 0',
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

            {/* Confirm Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Confirm Password *
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '11px 0',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                  }}
                />
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
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account &amp; Continue</span>
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
            Already have an account?{' '}
            <Link
              href={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              style={{
                color: 'var(--gold-light)',
                fontWeight: 700,
                textDecoration: 'none',
                marginLeft: '4px',
              }}
            >
              Sign In
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
          <span>Your information is encrypted &amp; stored securely in Firebase</span>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '85vh', backgroundColor: '#070c1a' }} />}>
      <RegisterForm />
    </Suspense>
  );
}
