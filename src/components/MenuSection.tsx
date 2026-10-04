'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Plus, Check, MessageCircle } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem, RESTAURANT_INFO } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

interface MenuSectionProps {
  isPage?: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ isPage = false }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, { label: string; price: number }>>({});
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const { addToCart } = useCart();

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' ? true : item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSizeChange = (itemId: string, size: { label: string; price: number }) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const size = item.sizes ? selectedSizes[item.id] || item.sizes[0] : undefined;
    addToCart(item, size);

    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#080e22',
        paddingTop: isPage ? '50px' : '40px',
        paddingBottom: '80px',
      }}
    >
      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              color: '#d4a359',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Karachi Culinary Collection
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#ffffff',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '10px',
            }}
          >
            Restaurant Menu &amp; Rates
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.96rem' }}>
            Every dish is cooked fresh to order with authentic seasonings, live charcoal grilling, and traditional Karachi recipes.
          </p>
        </div>

        {/* Clean Search Input */}
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto 28px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(12, 20, 43, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
            }}
          >
            <Search size={18} style={{ color: '#94a3b8', marginRight: '12px', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. zinger, bihari boti, karahi, fries)..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills (No tacky AI emojis/badges) */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '32px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid #d4a359' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: isActive ? '#141e3d' : 'rgba(10, 16, 35, 0.6)',
                  color: isActive ? '#f3cf8a' : '#94a3b8',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Count Note */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            color: '#64748b',
            fontSize: '0.86rem',
          }}
        >
          <span>Available offerings: {filteredItems.length}</span>
          {searchQuery && (
            <span style={{ color: '#d4a359' }}>Showing results for &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => {
            const currentSize = item.sizes
              ? selectedSizes[item.id] || item.sizes[0]
              : undefined;
            const displayPrice = currentSize ? currentSize.price : item.price;
            const isJustAdded = addedItemEffect === item.id;

            return (
              <div
                key={item.id}
                className="prestige-card"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Food Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '185px',
                    backgroundColor: '#050914',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 65%, rgba(14, 23, 49, 0.95) 100%)',
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.45,
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Size Selectors (e.g. Half / Full for Karahi and Handi) */}
                  {item.sizes && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '6px',
                        marginBottom: '14px',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '3px',
                        borderRadius: '6px',
                      }}
                    >
                      {item.sizes.map((s) => {
                        const isSelected = currentSize?.label === s.label;
                        return (
                          <button
                            key={s.label}
                            onClick={() => handleSizeChange(item.id, s)}
                            style={{
                              flex: 1,
                              padding: '5px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              fontSize: '0.74rem',
                              fontWeight: isSelected ? 700 : 500,
                              backgroundColor: isSelected ? '#b81522' : 'transparent',
                              color: isSelected ? '#ffffff' : '#cbd5e1',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Price & Action Footer */}
                  <div
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '1.18rem',
                          fontWeight: 700,
                          color: '#f3cf8a',
                          fontFamily: 'var(--font-serif)',
                        }}
                      >
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, marginRight: '2px' }}>Rs.</span>
                        {displayPrice}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <a
                        href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=Hello%20Bhashani%20Pakwan!%20I%20want%20to%20order%20${encodeURIComponent(item.name)}${currentSize ? `%20(${currentSize.label})` : ''}%20(Rs.%20${displayPrice})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold"
                        style={{ padding: '7px 10px', borderRadius: '4px' }}
                        title="Order via WhatsApp"
                      >
                        <MessageCircle size={15} />
                      </a>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="btn-solid-crimson"
                        style={{
                          padding: '7px 14px',
                          fontSize: '0.82rem',
                          borderRadius: '4px',
                          backgroundColor: isJustAdded ? '#1a6f44' : undefined,
                        }}
                      >
                        {isJustAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
