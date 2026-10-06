'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ClipboardList,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderStatus } from '@/lib/types';
import { RESTAURANT_INFO } from '@/data/menuData';

export const getStatusBadgeStyle = (status: OrderStatus) => {
  switch (status) {
    case 'Pending':
      return { bg: 'rgba(234, 179, 8, 0.15)', text: '#fde047', border: 'rgba(234, 179, 8, 0.35)', icon: Clock };
    case 'Confirmed':
      return { bg: 'rgba(59, 130, 246, 0.15)', text: '#93c5fd', border: 'rgba(59, 130, 246, 0.35)', icon: CheckCircle2 };
    case 'Preparing':
      return { bg: 'rgba(249, 115, 22, 0.15)', text: '#fdba74', border: 'rgba(249, 115, 22, 0.35)', icon: Clock };
    case 'Out for Delivery':
      return { bg: 'rgba(168, 85, 247, 0.15)', text: '#d8b4fe', border: 'rgba(168, 85, 247, 0.35)', icon: Truck };
    case 'Delivered':
      return { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac', border: 'rgba(34, 197, 94, 0.35)', icon: CheckCircle2 };
    case 'Cancelled':
      return { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5', border: 'rgba(239, 68, 68, 0.35)', icon: XCircle };
    default:
      return { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.35)', icon: Clock };
  }
};

export default function OrdersHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/orders');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    try {
      // Listen to real-time order updates for the logged in user
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: Order[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...(doc.data() as Order) });
          });
          // Sort newest first on client to avoid composite index requirements
          list.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
            return timeB - timeA;
          });
          setOrders(list);
          setLoadingOrders(false);
        },
        (err) => {
          console.warn('Orders listener error:', err);
          setLoadingOrders(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore orders subscription failed:', e);
      setLoadingOrders(false);
    }
  }, [user]);

  if (authLoading || (!user && !loadingOrders)) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: '#070c1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>Checking authorization...</div>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
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
      <div
        className="ambient-orb orb-gold"
        style={{ width: '450px', height: '450px', top: '-80px', left: '-80px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-60px', right: '-60px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '860px' }}>
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
            Customer History
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 800 }}>
                My Previous Orders
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Track live status updates and view details of your past meal orders.
              </p>
            </div>

            <Link href="/menu" className="btn-solid-crimson" style={{ padding: '9px 18px', fontSize: '0.86rem' }}>
              <ShoppingBag size={15} />
              <span>Order Food</span>
            </Link>
          </div>
        </div>

        {/* Orders List */}
        {loadingOrders ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--gold-light)' }}>
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div
            className="prestige-card"
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(11, 18, 42, 0.94)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧾</div>
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
              No Orders Placed Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 24px' }}>
              You haven&apos;t placed any orders yet. Explore our charcoal BBQ, crispy broast, and loaded zinger burgers to get started.
            </p>
            <Link href="/menu" className="btn-solid-crimson">
              Explore Our Menu
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.orderId;
              const badgeStyle = getStatusBadgeStyle(order.status);
              const BadgeIcon = badgeStyle.icon;

              return (
                <div
                  key={order.orderId}
                  className="prestige-card"
                  style={{
                    backgroundColor: 'rgba(11, 18, 42, 0.95)',
                    borderRadius: '14px',
                    border: '1px solid rgba(212, 163, 89, 0.22)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(order.orderId)}
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      cursor: 'pointer',
                      borderBottom: isExpanded ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                          {order.orderId}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.text,
                            border: `1px solid ${badgeStyle.border}`,
                            borderRadius: '100px',
                            padding: '3px 10px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                          }}
                        >
                          <BadgeIcon size={12} />
                          <span>{order.status}</span>
                        </span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {formatDate(order.createdAt)} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                          Total
                        </span>
                        <span style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1.18rem', fontFamily: 'var(--font-serif)' }}>
                          Rs. {order.total}
                        </span>
                      </div>

                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                        }}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div style={{ padding: '22px 24px', backgroundColor: 'rgba(7, 12, 28, 0.7)' }}>
                      {/* Customer & Address Details */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                        <div>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recipient</span>
                          <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>{order.customerName}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{order.customerPhone}</div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Location</span>
                          <div style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.4 }}>{order.deliveryAddress}</div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Payment Mode</span>
                          <div style={{ color: 'var(--gold-light)', fontWeight: 600, fontSize: '0.88rem' }}>{order.paymentMethod}</div>
                        </div>
                      </div>

                      {order.customerNotes && (
                        <div style={{ marginBottom: '16px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.74rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 700 }}>
                            Kitchen Note:
                          </span>
                          <div style={{ color: '#e2e8f0', fontSize: '0.86rem', marginTop: '2px' }}>&ldquo;{order.customerNotes}&rdquo;</div>
                        </div>
                      )}

                      {/* Items List */}
                      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                          Items Summary
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {order.items.map((it, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                              <span style={{ color: '#ffffff' }}>
                                {it.name} <span style={{ color: 'var(--text-muted)' }}>× {it.quantity}</span>
                              </span>
                              <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                                Rs. {it.price * it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery and Total */}
                      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          <span>Subtotal:</span>
                          <span>Rs. {order.subtotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          <span>Delivery Fee:</span>
                          <span style={{ color: order.deliveryFee === 0 ? 'var(--emerald)' : 'var(--gold)' }}>
                            {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', paddingTop: '8px' }}>
                          <span>Total:</span>
                          <span style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>Rs. {order.total}</span>
                        </div>
                      </div>

                      {/* Action WhatsApp follow-up */}
                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                        <a
                          href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan!%20Checking%20status%20for%20order%20%23${order.orderId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp-subtle"
                          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                        >
                          <MessageCircle size={14} />
                          <span>Contact Rider Dispatch</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
