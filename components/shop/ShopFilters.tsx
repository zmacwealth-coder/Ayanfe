'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}

const sortOptions = [
  { value: '', label: 'Latest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export function ShopFilters({ categories, currentCategory, currentSort, currentSearch }: ShopFiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (currentSearch && key !== 'search') params.set('search', currentSearch);
    if (currentCategory && key !== 'category') params.set('category', currentCategory);
    if (currentSort && key !== 'sort') params.set('sort', currentSort);
    if (value) params.set(key, value);
    router.push(`/shop${params.toString() ? `?${params}` : ''}`);
  };

  const clearAll = () => {
    setSearch('');
    router.push('/shop');
  };

  const filtersContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          marginBottom: '0.75rem',
        }}>
          Search
        </h3>
        <form
          onSubmit={(e) => { e.preventDefault(); updateFilter('search', search); }}
          style={{ display: 'flex', gap: '0.5rem' }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--warm-gray)' }} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="input"
              style={{ paddingLeft: '2.25rem', padding: '0.625rem 0.75rem 0.625rem 2.25rem' }}
            />
          </div>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          marginBottom: '0.75rem',
        }}>
          Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <button
            onClick={() => updateFilter('category', '')}
            style={{
              textAlign: 'left',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              background: !currentCategory ? 'var(--purple-50)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              color: !currentCategory ? 'var(--color-primary)' : 'var(--color-text)',
              fontWeight: !currentCategory ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.slug)}
              style={{
                textAlign: 'left',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: currentCategory === cat.slug ? 'var(--purple-50)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                color: currentCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: currentCategory === cat.slug ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--warm-gray)',
          marginBottom: '0.75rem',
        }}>
          Sort By
        </h3>
        <select
          value={currentSort || ''}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="input"
          style={{ padding: '0.625rem 0.75rem' }}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Clear */}
      {(currentCategory || currentSearch || currentSort) && (
        <button
          onClick={clearAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-error)',
            fontSize: '0.8125rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <X size={14} />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div style={{ width: 240, flexShrink: 0, position: 'sticky', top: 'calc(var(--nav-height) + 1.5rem)' }} className="filters-desktop">
        {filtersContent}
      </div>

      {/* Mobile filter button */}
      <div className="filters-mobile">
        <button
          onClick={() => setMobileOpen(true)}
          className="btn btn-ghost btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
        {mobileOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.5)',
          }} onClick={() => setMobileOpen(false)}>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
                padding: '1.5rem',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.375rem' }}>Filters</h2>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              {filtersContent}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .filters-desktop { display: none !important; }
          .filters-mobile { display: block !important; }
        }
        .filters-mobile { display: none; }
      `}</style>
    </>
  );
}
