'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderItem } from '@/lib/types';
import { RESTAURANT_INFO } from '@/data/menuData';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery (COD)' | 'Online Transfer'>('Cash on Delivery (COD)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Delivery fee (flat standard rate for Orangi Town / Karachi delivery dispatch)
  const deliveryFee = subtotal > 1500 ? 0 : 100;
  const grandTotal = subtotal + deliveryFee;

  // Protect page: require login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);

  // Pre-fill profile data
  useEffect(() => {
    if (userProfile) {
      setCustomerName(userProfile.name || '');
      setCustomerPhone(userProfile.phone || '');
      setDeliveryAddress(userProfile.address || '');
    }
  }, [userProfile]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: '#070c1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>Verifying authenticated session...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: '75vh',
          backgroundColor: '#070c1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div className="prestige-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '440px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</div>
          <h2 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '10px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Please select your favorite BBQ, broast, or deals from our menu before proceeding to checkout.
          </p>
          <Link href="/menu" className="btn-solid-crimson" style={{ justifyContent: 'center' }}>
            Browse Full Menu
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);

    // Validate inputs
    if (!customerName.trim()) {
      setOrderError('Please enter your full name for delivery.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      setOrderError('Please enter a valid phone number for dispatch verification.');
      return;
    }
    if (!deliveryAddress.trim() || deliveryAddress.length < 10) {
      setOrderError('Please provide a complete delivery address (street, sector, or landmark).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate Human-Readable Unique Order ID
      const timestampPart = Date.now().toString().slice(-6);
      const randomPart = Math.floor(10 + Math.random() * 90);
      const uniqueOrderId = `BPC-${timestampPart}${randomPart}`;

      // Convert cart items to clean OrderItem schema
      const orderItems: OrderItem[] = cart.map((item) => ({
        id: item.id,
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image,
      }));

      const newOrder: Order = {
        orderId: uniqueOrderId,
        userId: user.uid,
        customerName: customerName.trim(),
        customerEmail: user.email || '',
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        customerNotes: customerNotes.trim(),
        items: orderItems,
        subtotal,
        deliveryFee,
        total: grandTotal,
        paymentMethod,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Save order to Firestore orders collection
      const orderRef = doc(db, 'orders', uniqueOrderId);
      await setDoc(orderRef, newOrder);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      // Clear the cart
      clearCart();

      // Navigate to order confirmation
      router.push(`/order-confirmation?orderId=${uniqueOrderId}`);
    } catch (err: any) {
      console.error('Error placing order:', err);
      setOrderError(err.message || 'Unable to place order. Please try again or contact our hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        backgroundColor: '#070c1a',
        padding: '50px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb orb-gold"
        style={{ width: '450px', height: '450px', top: '-80px', right: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-60px', left: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '1060px' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
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
            Direct Kitchen Dispatch
          </span>
          <h1 className="font-serif" style={{ fontSize: '2.4rem', color: '#ffffff', fontWeight: 800 }}>
            Complete Your Order
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
            Review your order items, confirm your delivery address, and place your order.
          </p>
        </div>

        {orderError && (
          <div
            style={{
              backgroundColor: 'rgba(184, 21, 34, 0.15)',
              border: '1px solid rgba(184, 21, 34, 0.4)',
              borderRadius: '8px',
              padding: '14px 18px',
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#fca5a5',
              fontSize: '0.92rem',
            }}
          >
            <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
            <span>{orderError}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Left Column: Delivery & Payment Details Form */}
          <div>
            <div
              className="prestige-card"
              style={{
                padding: '30px',
                backgroundColor: 'rgba(11, 18, 42, 0.94)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 89, 0.25)',
                marginBottom: '24px',
              }}
            >
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <MapPin size={18} style={{ color: 'var(--gold)' }} />
                <span>1. Delivery Information</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
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
                    <User size={16} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Receiver's name"
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

                {/* Contact Phone */}
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Contact Phone Number (Rider Call) *
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
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0314 1234567"
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

                {/* Delivery Address */}
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Full Delivery Address *
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
                      rows={3}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Plot / House number, Street, Sector-14/A or nearby landmark in Karachi"
                      required
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

                {/* Special Cooking/Delivery Notes */}
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                    Cooking / Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="e.g. Extra raita, less spicy, call before ringing bell"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(5, 9, 20, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '11px 14px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div
              className="prestige-card"
              style={{
                padding: '30px',
                backgroundColor: 'rgba(11, 18, 42, 0.94)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 89, 0.25)',
              }}
            >
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Banknote size={18} style={{ color: 'var(--gold)' }} />
                <span>2. Payment Method</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border:
                      paymentMethod === 'Cash on Delivery (COD)'
                        ? '1.5px solid var(--gold)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor:
                      paymentMethod === 'Cash on Delivery (COD)'
                        ? 'rgba(212, 163, 89, 0.1)'
                        : 'rgba(5, 9, 20, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery (COD)'}
                    onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.94rem' }}>
                      Cash on Delivery (COD)
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      Pay in cash when rider delivers hot food to your door.
                    </div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border:
                      paymentMethod === 'Online Transfer'
                        ? '1.5px solid var(--gold)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor:
                      paymentMethod === 'Online Transfer'
                        ? 'rgba(212, 163, 89, 0.1)'
                        : 'rgba(5, 9, 20, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Online Transfer'}
                    onChange={() => setPaymentMethod('Online Transfer')}
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.94rem' }}>
                      Online Bank / Raast / JazzCash Transfer
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      Share payment screenshot with restaurant dispatch on WhatsApp.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Confirmation Button */}
          <div>
            <div
              className="prestige-card"
              style={{
                padding: '30px',
                backgroundColor: 'rgba(11, 18, 42, 0.94)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 89, 0.25)',
                position: 'sticky',
                top: '90px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700 }}>Order Summary</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div
                style={{
                  maxHeight: '260px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px',
                  paddingRight: '6px',
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(5, 9, 20, 0.6)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '44px',
                        height: '44px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: '#ffffff',
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} × Rs. {item.price}
                      </div>
                    </div>

                    <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>Rs. {subtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <span>Delivery Charges:</span>
                  <span style={{ color: deliveryFee === 0 ? 'var(--emerald)' : 'var(--gold)', fontWeight: 600 }}>
                    {deliveryFee === 0 ? 'FREE (Orders over Rs. 1500)' : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '14px',
                    marginTop: '8px',
                  }}
                >
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                    Rs. {grandTotal}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="btn-solid-crimson"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  justifyContent: 'center',
                  marginTop: '24px',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
                  <span>Saving Order in Firebase...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order</span>
                    <CheckCircle size={18} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                🔒 Secure order processing with live status tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
