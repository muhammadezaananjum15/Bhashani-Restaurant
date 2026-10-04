'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { RESTAURANT_INFO } from '@/data/menuData';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    let msg = `*NEW ORDER - BHASHANI PAKWAN CENTER*\n`;
    msg += `--------------------------------------\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* x ${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });
    msg += `--------------------------------------\n`;
    msg += `*Subtotal:* Rs. ${subtotal}\n`;
    msg += `*Delivery Charges:* According to Area\n\n`;

    msg += `*Customer Details:*\n`;
    msg += `👤 *Name:* ${customerName || 'Customer'}\n`;
    msg += `📞 *Phone:* ${customerPhone || 'Not provided'}\n`;
    msg += `📍 *Delivery Address:* ${deliveryAddress || 'Pick-up / Orangi Town'}\n`;
    if (customerNotes) {
      msg += `📝 *Notes:* ${customerNotes}\n`;
    }
    msg += `\nPlease confirm my order and share the delivery estimate. Thank you!`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodedMsg}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 300);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(3, 7, 18, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#090f23',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            backgroundColor: '#111b38',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={18} style={{ color: '#d4a359' }} />
            <div>
              <h3 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem' }}>Your Order</h3>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Trash2 size={13} /> Clear
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                borderRadius: '4px',
                width: '32px',
                height: '32px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#64748b',
                margin: 'auto 0',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🍽️</div>
              <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.86rem', marginBottom: '18px' }}>
                Select items from our menu to begin your order.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-solid-crimson"
                style={{ padding: '9px 20px', fontSize: '0.86rem' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'rgba(16, 25, 56, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '56px',
                      height: '56px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#050914',
                    }}
                  >
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="56px" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5
                      style={{
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.82rem', color: '#f3cf8a', fontWeight: 700, marginTop: '2px', fontFamily: 'var(--font-serif)' }}>
                      Rs. {item.price}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      padding: '2px 4px',
                      gap: '6px',
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#cbd5e1',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', minWidth: '14px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#cbd5e1',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.4)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              {/* Delivery Details Form */}
              <div
                style={{
                  marginTop: '10px',
                  backgroundColor: 'rgba(12, 19, 44, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#d4a359',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MapPin size={14} /> Delivery Info
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />

                  <textarea
                    rows={2}
                    placeholder="Delivery Address (Sector, Street, Orangi Town / Karachi)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Special instructions (optional)"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#070c1a',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
              <span style={{ color: '#94a3b8' }}>Items Subtotal:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Rs. {subtotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.82rem' }}>
              <span style={{ color: '#94a3b8' }}>Delivery Charges:</span>
              <span style={{ color: '#d4a359' }}>According to Area</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '14px',
              }}
            >
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Total:</span>
              <span style={{ color: '#f3cf8a', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
                Rs. {subtotal}
              </span>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="btn-whatsapp-subtle"
              style={{
                width: '100%',
                padding: '12px',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
              <span>Send Order via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
