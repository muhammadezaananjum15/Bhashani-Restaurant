'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Search,
  Filter,
  ArrowUpDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  LogOut,
  ChevronDown,
  X,
  Eye,
  AlertTriangle,
  UserX,
} from 'lucide-react';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderStatus } from '@/lib/types';
import { getStatusBadgeStyle } from '@/app/orders/page';

const ALL_STATUSES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export default function AdminDashboardPage() {
  const { user, isAdmin, role, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Security Guard: Check admin role
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/admin/login');
      }
    }
  }, [user, authLoading, router]);

  // Real-time Firestore orders listener for Admin
  useEffect(() => {
    if (!user || !isAdmin) return;

    try {
      const ordersCol = collection(db, 'orders');
      const unsubscribe = onSnapshot(
        ordersCol,
        (snapshot) => {
          const list: Order[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Order) });
          });
          setOrders(list);
          setLoadingOrders(false);
        },
        (err) => {
          console.warn('Admin orders subscription notice:', err);
          setLoadingOrders(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn('Error setting up admin listener:', e);
      setLoadingOrders(false);
    }
  }, [user, isAdmin]);

  // Status Metrics calculation
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    let pendingCount = 0;
    let confirmedCount = 0;
    let preparingCount = 0;
    let outCount = 0;
    let deliveredCount = 0;
    let cancelledCount = 0;
    let totalRevenue = 0;

    orders.forEach((o) => {
      if (o.status === 'Pending') pendingCount++;
      else if (o.status === 'Confirmed') confirmedCount++;
      else if (o.status === 'Preparing') preparingCount++;
      else if (o.status === 'Out for Delivery') outCount++;
      else if (o.status === 'Delivered') {
        deliveredCount++;
        totalRevenue += o.total || 0;
      } else if (o.status === 'Cancelled') cancelledCount++;
    });

    return {
      totalOrders,
      pendingCount,
      confirmedCount,
      preparingCount,
      outCount,
      deliveredCount,
      cancelledCount,
      totalRevenue,
    };
  }, [orders]);

  // Filter & Search processing
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        // Status filter
        if (statusFilter !== 'all' && o.status !== statusFilter) return false;

        // Search query filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const matchesId = (o.orderId || '').toLowerCase().includes(q);
        const matchesName = (o.customerName || '').toLowerCase().includes(q);
        const matchesPhone = (o.customerPhone || '').toLowerCase().includes(q);
        const matchesAddress = (o.deliveryAddress || '').toLowerCase().includes(q);

        return matchesId || matchesName || matchesPhone || matchesAddress;
      })
      .sort((a, b) => {
        const timeA = a.createdAt?.toMillis
          ? a.createdAt.toMillis()
          : a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : 0;
        const timeB = b.createdAt?.toMillis
          ? b.createdAt.toMillis()
          : b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : 0;

        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [orders, statusFilter, searchQuery, sortOrder]);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      // Update selected order modal if active
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Error updating order status in Firestore. Please verify Firestore rules.');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div style={{ minHeight: '80vh', backgroundColor: '#050914', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>Verifying Administrator Credentials...</div>
      </div>
    );
  }

  // Unauthorized screen if authenticated user is NOT an admin
  if (user && !isAdmin) {
    return (
      <div
        style={{
          minHeight: '80vh',
          backgroundColor: '#050914',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          className="prestige-card"
          style={{
            padding: '40px 32px',
            maxWidth: '480px',
            textAlign: 'center',
            backgroundColor: 'rgba(10, 16, 38, 0.96)',
            border: '1.5px solid rgba(184, 21, 34, 0.4)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(184, 21, 34, 0.2)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
            }}
          >
            <AlertTriangle size={32} />
          </div>

          <h2 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '8px' }}>
            Access Restricted
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Your account ({user.email}) is currently assigned the <strong>&ldquo;{role}&rdquo;</strong> role.
            Only accounts with the <strong>&ldquo;admin&rdquo;</strong> role in Cloud Firestore can access the restaurant owner dashboard.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => signOut()}
              className="btn-solid-crimson"
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
            >
              Sign Out &amp; Switch Account
            </button>
            <Link href="/" className="btn-outline-gold" style={{ padding: '10px 20px', fontSize: '0.86rem' }}>
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '90vh',
        backgroundColor: '#050914',
        padding: '40px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="ambient-orb orb-gold"
        style={{ width: '500px', height: '500px', top: '-100px', right: '-100px', zIndex: 0 }}
      />
      <div
        className="ambient-orb orb-crimson"
        style={{ width: '400px', height: '400px', bottom: '-80px', left: '-80px', zIndex: 0 }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '1240px' }}>
        {/* Top Header & Admin identity */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(212, 163, 89, 0.15)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-light)',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <ShieldCheck size={12} />
                Restaurant Owner
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>• Live Kitchen Dispatch</span>
            </div>

            <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: 900 }}>
              Bhashani Orders Command Center
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                padding: '9px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              View Storefront ↗
            </Link>

            <button
              onClick={() => signOut()}
              style={{
                backgroundColor: 'rgba(184, 21, 34, 0.2)',
                border: '1px solid rgba(184, 21, 34, 0.4)',
                color: '#f87171',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* ── Metric Stat Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {/* Total Orders */}
          <div className="prestige-card" style={{ padding: '20px', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Orders
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: '#ffffff', fontWeight: 900, marginTop: '6px' }}>
              {stats.totalOrders}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: '4px' }}>All-time recorded</div>
          </div>

          {/* Pending (Needs action) */}
          <div
            className="prestige-card"
            style={{
              padding: '20px',
              backgroundColor: stats.pendingCount > 0 ? 'rgba(234, 179, 8, 0.1)' : 'rgba(11, 18, 42, 0.85)',
              border: stats.pendingCount > 0 ? '1.5px solid rgba(234, 179, 8, 0.4)' : undefined,
            }}
          >
            <span style={{ fontSize: '0.76rem', color: '#fde047', textTransform: 'uppercase', fontWeight: 700 }}>
              Pending Action
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: '#fde047', fontWeight: 900, marginTop: '6px' }}>
              {stats.pendingCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#fef08a', marginTop: '4px' }}>Requires kitchen confirm</div>
          </div>

          {/* Preparing */}
          <div className="prestige-card" style={{ padding: '20px', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}>
            <span style={{ fontSize: '0.76rem', color: '#fdba74', textTransform: 'uppercase', fontWeight: 700 }}>
              Cooking / Grill
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: '#fdba74', fontWeight: 900, marginTop: '6px' }}>
              {stats.preparingCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>On coal or fryer</div>
          </div>

          {/* Out for Delivery */}
          <div className="prestige-card" style={{ padding: '20px', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}>
            <span style={{ fontSize: '0.76rem', color: '#d8b4fe', textTransform: 'uppercase', fontWeight: 700 }}>
              With Rider
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: '#d8b4fe', fontWeight: 900, marginTop: '6px' }}>
              {stats.outCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Out for delivery</div>
          </div>

          {/* Delivered */}
          <div className="prestige-card" style={{ padding: '20px', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}>
            <span style={{ fontSize: '0.76rem', color: '#86efac', textTransform: 'uppercase', fontWeight: 700 }}>
              Completed
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: '#86efac', fontWeight: 900, marginTop: '6px' }}>
              {stats.deliveredCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Successfully served</div>
          </div>

          {/* Total Sales */}
          <div className="prestige-card" style={{ padding: '20px', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
              Delivered Revenue
            </span>
            <div className="font-serif" style={{ fontSize: '1.9rem', color: 'var(--gold-light)', fontWeight: 900, marginTop: '6px' }}>
              Rs. {stats.totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: '4px' }}>Completed sales</div>
          </div>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div
          className="prestige-card"
          style={{
            padding: '18px 20px',
            backgroundColor: 'rgba(11, 18, 42, 0.94)',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Search Box */}
          <div style={{ flex: '1', minWidth: '260px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(4, 7, 18, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0 12px',
              }}
            >
              <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '8px', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order ID, customer name, phone number or address..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '10px 0',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Status Pills */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'Pending', label: 'Pending' },
              { id: 'Confirmed', label: 'Confirmed' },
              { id: 'Preparing', label: 'Preparing' },
              { id: 'Out for Delivery', label: 'Out for Delivery' },
              { id: 'Delivered', label: 'Delivered' },
              { id: 'Cancelled', label: 'Cancelled' },
            ].map((tab) => {
              const isSelected = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '6px',
                    border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: isSelected ? 'rgba(212, 163, 89, 0.2)' : 'rgba(5, 9, 20, 0.6)',
                    color: isSelected ? 'var(--gold-light)' : '#94a3b8',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort order toggle */}
          <div>
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(5, 9, 20, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '7px 12px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <ArrowUpDown size={14} />
              <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          </div>
        </div>

        {/* ── Orders Table / List View ── */}
        {loadingOrders ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gold-light)' }}>
            Loading incoming restaurant orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div
            className="prestige-card"
            style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'rgba(11, 18, 42, 0.85)' }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🔍</div>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '6px' }}>No Orders Found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              No orders matched your current search query or status filter.
            </p>
          </div>
        ) : (
          <div
            className="prestige-card"
            style={{
              backgroundColor: 'rgba(11, 18, 42, 0.94)',
              borderRadius: '14px',
              border: '1px solid rgba(212, 163, 89, 0.22)',
              overflowX: 'auto',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(5, 9, 20, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Order ID / Date
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Customer Details
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Items Summary
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Total / Payment
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Current Status
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const badgeStyle = getStatusBadgeStyle(order.status);
                  const BadgeIcon = badgeStyle.icon;
                  const isUpdating = updatingId === order.orderId;

                  return (
                    <tr
                      key={order.orderId}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      {/* Order ID & Time */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                        <div style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '0.94rem', fontFamily: 'var(--font-serif)' }}>
                          {order.orderId}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                          {formatDate(order.createdAt)}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>
                          {order.customerName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                          <a
                            href={`tel:${order.customerPhone}`}
                            style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}
                          >
                            📞 {order.customerPhone}
                          </a>
                        </div>
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.78rem',
                            marginTop: '2px',
                            maxWidth: '220px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={order.deliveryAddress}
                        >
                          📍 {order.deliveryAddress}
                        </div>
                      </td>

                      {/* Items */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                        <div style={{ color: '#cbd5e1', fontSize: '0.84rem' }}>
                          {order.items.slice(0, 2).map((it, idx) => (
                            <div key={idx} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                              • {it.name} <span style={{ color: 'var(--text-muted)' }}>×{it.quantity}</span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div style={{ color: 'var(--gold)', fontSize: '0.76rem', marginTop: '2px' }}>
                              +{order.items.length - 2} more items
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Total */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                        <div style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                          Rs. {order.total}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '2px' }}>
                          {order.paymentMethod}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                              width: 'fit-content',
                            }}
                          >
                            <BadgeIcon size={12} />
                            <span>{order.status}</span>
                          </span>

                          <select
                            value={order.status}
                            disabled={isUpdating}
                            onChange={(e) => handleUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                            style={{
                              backgroundColor: 'rgba(5, 9, 20, 0.85)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                              outline: 'none',
                            }}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                Mark as {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 18px', verticalAlign: 'top', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="btn-outline-gold"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          <Eye size={13} />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Order Detail Modal / Dialog ── */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="prestige-card"
            style={{
              backgroundColor: '#0a1128',
              border: '1.5px solid var(--gold-border)',
              borderRadius: '16px',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Full Kitchen Ticket
                </span>
                <h3 className="font-serif" style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 800 }}>
                  Order #{selectedOrder.orderId}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Status Control */}
            <div style={{ backgroundColor: 'rgba(5, 9, 20, 0.7)', padding: '14px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block' }}>Current Status</span>
                <span style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.94rem' }}>{selectedOrder.status}</span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {ALL_STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.orderId, st)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      border: selectedOrder.status === st ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: selectedOrder.status === st ? 'var(--gold)' : 'rgba(255,255,255,0.04)',
                      color: selectedOrder.status === st ? '#000000' : '#cbd5e1',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customer Name</span>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>{selectedOrder.customerName}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone Hotline</span>
                <div>
                  <a href={`tel:${selectedOrder.customerPhone}`} style={{ color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 700 }}>
                    {selectedOrder.customerPhone}
                  </a>
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Location</span>
                <div style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5 }}>{selectedOrder.deliveryAddress}</div>
              </div>
              {selectedOrder.customerNotes && (
                <div style={{ gridColumn: '1 / -1', backgroundColor: 'rgba(212, 163, 89, 0.08)', border: '1px solid rgba(212, 163, 89, 0.2)', padding: '10px 12px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Customer Instruction:
                  </span>
                  <div style={{ color: '#ffffff', fontSize: '0.86rem', marginTop: '2px' }}>&ldquo;{selectedOrder.customerNotes}&rdquo;</div>
                </div>
              )}
            </div>

            {/* Items */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Order Items
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '6px 0', borderBottom: '1px dashed rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#ffffff' }}>
                      {it.name} <span style={{ color: 'var(--text-muted)' }}>× {it.quantity}</span>
                    </span>
                    <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>
                      Rs. {it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Payment ({selectedOrder.paymentMethod})</span>
              </div>
              <div style={{ color: 'var(--gold-light)', fontWeight: 900, fontSize: '1.3rem', fontFamily: 'var(--font-serif)' }}>
                Total: Rs. {selectedOrder.total}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
