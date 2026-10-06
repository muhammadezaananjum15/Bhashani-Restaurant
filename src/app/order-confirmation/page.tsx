'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, Phone, MapPin, ClipboardList, Utensils, MessageCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/lib/types';
import { RESTAURANT_INFO } from '@/data/menuData';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderSnap = await getDoc(doc(db, 'orders', orderId));
        if (orderSnap.exists()) {
          setOrder(orderSnap.data() as Order);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: '#070c1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>Loading order confirmation...</div>
      </div>
    );
  }

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
      <div
        className="ambient-orb orb-gold"
        style={{ width: '450px', height: '450px', top: '-80px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '680px' }}>
        {/* Success Banner */}
        <div
          className="prestige-card"
          style={{
            padding: '40px 32px',
            backgroundColor: 'rgba(11, 18, 42, 0.94)',
            borderRadius: '16px',
            border: '1.5px solid rgba(212, 163, 89, 0.35)',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'rgba(37, 211, 102, 0.15)',
              border: '2px solid rgba(37, 211, 102, 0.4)',
              color: 'var(--emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <h1 className="font-serif" style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '480px', margin: '0 auto 24px' }}>
            Your order has been recorded in our restaurant system and dispatched to our kitchen.
          </p>

          {/* Order ID Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(212, 163, 89, 0.12)',
              border: '1.5px dashed var(--gold-border)',
              borderRadius: '10px',
              padding: '12px 24px',
              marginBottom: '20px',
            }}
          >
            <span style={{ color: '#cbd5e1', fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Order ID:
            </span>
            <span style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
              {orderId || 'BPC-CONFIRMED'}
            </span>
          </div>

          {/* Status Badge */}
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: '#fde047',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                borderRadius: '100px',
                padding: '5px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
              }}
            >
              <Clock size={14} />
              <span>Status: {order?.status || 'Pending Kitchen Confirmation'}</span>
            </span>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && (
          <div
            className="prestige-card"
            style={{
              padding: '28px',
              backgroundColor: 'rgba(11, 18, 42, 0.94)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '28px',
            }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px' }}>
              Order Details
            </h3>

            {/* Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customer</span>
                <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.92rem' }}>{order.customerName}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact Phone</span>
                <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.92rem' }}>{order.customerPhone}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Address</span>
                <div style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.5 }}>{order.deliveryAddress}</div>
              </div>
              {order.customerNotes && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Special Instructions</span>
                  <div style={{ color: 'var(--gold-light)', fontSize: '0.88rem' }}>&ldquo;{order.customerNotes}&rdquo;</div>
                </div>
              )}
            </div>

            {/* Items */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Items Ordered
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#ffffff' }}>
                      {item.name} <span style={{ color: 'var(--text-muted)' }}>× {item.quantity}</span>
                    </span>
                    <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Payment ({order.paymentMethod}):</span>
              </div>
              <div style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                Rs. {order.total}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/orders" className="btn-solid-crimson" style={{ flex: 1, justifyContent: 'center', minWidth: '180px' }}>
            <ClipboardList size={16} />
            <span>Track in Order History</span>
          </Link>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan!%20I%20just%20placed%20order%20%23${orderId || ''}%20for%20delivery.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-subtle"
            style={{ flex: 1, justifyContent: 'center', minWidth: '180px' }}
          >
            <MessageCircle size={16} />
            <span>Contact Kitchen on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: '#070c1a' }} />}>
      <ConfirmationContent />
    </Suspense>
  );
}
