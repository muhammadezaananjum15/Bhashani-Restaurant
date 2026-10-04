'use client';

import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

export const FloatingActions: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <>
      {/* Bottom Floating Bar when items in Cart */}
      {totalItems > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 990,
            width: 'calc(100% - 32px)',
            maxWidth: '460px',
          }}
        >
          <div
            onClick={() => setIsCartOpen(true)}
            style={{
              backgroundColor: '#b81522',
              borderRadius: '8px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {totalItems} items
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                Rs. {subtotal}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.88rem' }}>
              <span>View Order</span>
              <ShoppingBag size={16} />
            </div>
          </div>
        </div>
      )}

      {/* Understated WhatsApp Action Button */}
      <div
        style={{
          position: 'fixed',
          bottom: totalItems > 0 ? '80px' : '24px',
          right: '24px',
          zIndex: 950,
        }}
      >
        <a
          href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan%20Center!`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#1a6f44',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            textDecoration: 'none',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'transform 0.2s ease',
          }}
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </>
  );
};
