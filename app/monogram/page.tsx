'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { monogramRequestSchema, type MonogramRequestInput } from '@/lib/validations';
import { Pen, Check, ArrowRight, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const fontStyles = [
  { value: 'classic', label: 'Classic', preview: 'ABC' },
  { value: 'modern', label: 'Modern', preview: 'ABC' },
  { value: 'script', label: 'Script', preview: 'ABC' },
  { value: 'block', label: 'Block', preview: 'ABC' },
];

const placements = [
  { value: 'chest', label: 'Chest Pocket' },
  { value: 'cuff', label: 'Cuff' },
  { value: 'collar', label: 'Collar' },
  { value: 'back', label: 'Back' },
  { value: 'hem', label: 'Hem' },
];

const garmentTypes = [
  'Dress Shirt', 'Kaftan', 'Agbada', 'Suit Jacket', 'Blazer',
  'Trousers', 'Polo Shirt', 'Towel/Robe', 'Other'
];

export default function MonogramPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewInitials, setPreviewInitials] = useState('AYC');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<MonogramRequestInput>({
    resolver: zodResolver(monogramRequestSchema),
    defaultValues: {
      fontSize: 'medium',
      fontStyle: 'classic',
      placement: 'chest',
    },
  });

  const watchedInitials = watch('initials');
  const watchedFontStyle = watch('fontStyle');

  const onSubmit = async (data: MonogramRequestInput) => {
    setLoading(true);
    try {
      const res = await fetch('/api/monogram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success('Monogram request submitted!');
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-wrapper section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Check size={32} color="var(--color-primary)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', marginBottom: '1rem' }}>Request Received!</h2>
          <p style={{ color: 'var(--warm-gray)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Thank you for your monogram request. Our team will review your specifications and contact you within 24 hours with a quote and confirmation.
          </p>
          <a href="/" className="btn btn-primary btn-lg">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Pen size={18} color="var(--gold)" />
            <span className="text-label" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>Personalization</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Monogram Service
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, marginBottom: '2rem' }}>
            Your initials, artfully embroidered. Choose your font, placement, and thread color for a truly personal touch starting from ₦15,000.
          </p>

          {/* Preview */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '2px solid rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.08)',
            animation: 'float 4s ease-in-out infinite',
          }}>
            <span style={{
              fontFamily: watchedFontStyle === 'script' ? 'Cormorant Garamond, serif' : 'Inter, sans-serif',
              fontSize: '2.5rem',
              color: 'var(--gold-light)',
              fontWeight: watchedFontStyle === 'block' ? 800 : 400,
              fontStyle: watchedFontStyle === 'script' ? 'italic' : 'normal',
            }}>
              {watchedInitials || previewInitials}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="text-headline" style={{ marginBottom: '0.75rem' }}>Customize Your Monogram</h2>
              <p style={{ color: 'var(--warm-gray)' }}>Fill in your preferences and our artisans will bring your vision to life.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Personal Info */}
              <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Your Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Full Name *</label>
                    <input type="text" className={`input ${errors.fullName ? 'input-error' : ''}`} placeholder="Adewale Okonkwo" {...register('fullName')} />
                    {errors.fullName && <span className="error-msg">{errors.fullName.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Initials *</label>
                    <input type="text" className={`input ${errors.initials ? 'input-error' : ''}`} placeholder="A.O.L" maxLength={6} {...register('initials')} onChange={(e) => { register('initials').onChange(e); setPreviewInitials(e.target.value || 'AYC'); }} />
                    {errors.initials && <span className="error-msg">{errors.initials.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input type="email" className="input" placeholder="your@email.com" {...register('guestEmail')} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone</label>
                    <input type="tel" className="input" placeholder="+234 xxx xxx xxxx" {...register('guestPhone')} />
                  </div>
                </div>
              </div>

              {/* Garment */}
              <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Garment Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Garment Type *</label>
                    <select className={`input ${errors.garmentType ? 'input-error' : ''}`} {...register('garmentType')}>
                      <option value="">Select garment type</option>
                      {garmentTypes.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.garmentType && <span className="error-msg">{errors.garmentType.message}</span>}
                  </div>
                  <div className="input-group">
                    <label className="input-label">Fabric (Optional)</label>
                    <input type="text" className="input" placeholder="e.g. Cotton, Silk, Linen" {...register('fabric')} />
                  </div>
                </div>
              </div>

              {/* Style */}
              <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Monogram Style</h3>

                {/* Font Style */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Font Style</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                    {fontStyles.map((f) => {
                      const isSelected = watch('fontStyle') === f.value;
                      return (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setValue('fontStyle', f.value as any)}
                          style={{
                            padding: '1rem 0.5rem',
                            border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-lg)',
                            background: isSelected ? 'var(--purple-50)' : '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.15s',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: isSelected ? 'var(--color-primary)' : 'var(--color-text)' }}>
                            {f.preview}
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: isSelected ? 'var(--color-primary)' : 'var(--warm-gray)' }}>
                            {f.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Placement */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Placement</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {placements.map((p) => {
                      const isSelected = watch('placement') === p.value;
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setValue('placement', p.value as any)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: '999px',
                            background: isSelected ? 'var(--color-primary)' : '#fff',
                            color: isSelected ? '#fff' : 'var(--color-text)',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontFamily: 'var(--font-ui)',
                            transition: 'all 0.15s',
                          }}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Thread Colors */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Primary Thread Color</label>
                    <input type="text" className="input" placeholder="e.g. Gold, Silver, White" {...register('primaryColor')} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Secondary Color (Optional)</label>
                    <input type="text" className="input" placeholder="e.g. Navy, Black" {...register('secondaryColor')} />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="input-group">
                <label className="input-label">Special Notes (Optional)</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Any special instructions, preferred size, reference images, or additional requirements..."
                  style={{ resize: 'vertical' }}
                  {...register('specialNotes')}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Submitting...' : <>Submit Monogram Request <ArrowRight size={18} /></>}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--warm-gray)' }}>
                Starting from ₦15,000 · Our team will contact you within 24 hours with a quote.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
