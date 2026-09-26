'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();

      if (!res.ok) {
        toast.error(body.error || 'Registration failed');
        return;
      }

      toast.success('Account created! Signing you in...');
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push('/account');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--purple-950) 0%, var(--purple-900) 50%, var(--purple-800) 100%)',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(24px)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        boxShadow: 'var(--shadow-xl)',
        animation: 'scaleIn 0.4s ease-out',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--color-primary)' }}>AYANFE</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--warm-gray)', textTransform: 'uppercase' }}>CLOTHIERS</div>
          </Link>
        </div>

        <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '0.5rem', textAlign: 'center' }}>
          Join the Circle
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--warm-gray)', textAlign: 'center', marginBottom: '2rem' }}>
          Create your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Your full name" autoComplete="name" {...register('name')} />
            {errors.name && <span className="error-msg">{errors.name.message}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} placeholder="your@email.com" autoComplete="email" {...register('email')} />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Phone (Optional)</label>
            <input type="tel" className="input" placeholder="+234 xxx xxx xxxx" autoComplete="tel" {...register('phone')} />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} className={`input ${errors.password ? 'input-error' : ''}`} placeholder="Min 8 characters" autoComplete="new-password" style={{ paddingRight: '3rem' }} {...register('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-gray)' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="error-msg">{errors.password.message}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input type="password" className={`input ${errors.confirmPassword ? 'input-error' : ''}`} placeholder="Repeat password" autoComplete="new-password" {...register('confirmPassword')} />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating account...' : <>Create Account <ArrowRight size={18} /></>}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
