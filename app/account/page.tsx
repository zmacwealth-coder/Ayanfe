import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { orders, wishlistItems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Package, Heart, Settings, User, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/login');

  const [userOrders, userWishlist] = await Promise.all([
    db.query.orders.findMany({
      where: eq(orders.userId, session.user.id),
      with: { items: true },
      orderBy: (o, { desc }) => [desc(o.createdAt)],
      limit: 5,
    }),
    db.query.wishlistItems.findMany({
      where: eq(wishlistItems.userId, session.user.id),
      with: { product: true },
    }),
  ]);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', color: '#fff', fontWeight: 500 }}>
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#fff', fontWeight: 400, marginBottom: '0.25rem' }}>
                Welcome, {session.user.name?.split(' ')[0]}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem' }}>{session.user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2.5rem', alignItems: 'flex-start' }} className="account-grid">

            {/* Sidebar */}
            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', position: 'sticky', top: 'calc(var(--nav-height) + 1.5rem)' }}>
              {[
                { icon: <User size={16} />, label: 'Profile', href: '/account' },
                { icon: <Package size={16} />, label: 'My Orders', href: '/account#orders' },
                { icon: <Heart size={16} />, label: 'Wishlist', href: '/wishlist' },
                { icon: <Settings size={16} />, label: 'Settings', href: '/account#settings' },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'background 0.15s',
                }}>
                  <span style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Main */}
            <div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  { label: 'Total Orders', value: userOrders.length },
                  { label: 'Wishlist Items', value: userWishlist.length },
                  { label: 'Member Since', value: new Date(session.user.id ? Date.now() : Date.now()).getFullYear().toString() },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Orders */}
              <div id="orders">
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Orders</h2>
                {userOrders.length === 0 ? (
                  <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
                    <Package size={40} color="var(--purple-300)" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ color: 'var(--warm-gray)', marginBottom: '1rem' }}>No orders yet.</p>
                    <Link href="/shop" className="btn btn-primary btn-sm">Start Shopping</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {userOrders.map((order) => (
                      <div key={order.id} style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1.25rem 1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <div>
                            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>#{order.orderNumber}</div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>{new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'capitalize',
                              background: order.status === 'delivered' ? '#e8f5e9' : order.status === 'cancelled' ? '#ffebee' : '#e3f2fd',
                              color: order.status === 'delivered' ? '#2e7d32' : order.status === 'cancelled' ? '#c62828' : '#1565c0',
                            }}>
                              {order.status}
                            </span>
                            <span style={{ fontWeight: 600, fontSize: '1.0625rem' }}>{formatPrice(parseFloat(order.total as string))}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .account-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
