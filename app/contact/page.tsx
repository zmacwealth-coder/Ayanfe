'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultationSchema, type ConsultationInput } from '@/lib/validations';
import { Phone, Mail, MapPin, Clock, Calendar, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { serviceType: 'general' },
  });

  const onSubmit = async (data: ConsultationInput) => {
    setLoading(true);
    // In production: send to API/WhatsApp/email
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    toast.success('Message sent! We\'ll be in touch soon.');
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--purple-900) 0%, var(--purple-700) 100%)', padding: 'clamp(4rem, 8vw, 6rem) 0', textAlign: 'center' }}>
        <div className="container">
          <span className="text-label" style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'block', letterSpacing: '0.2em' }}>Get In Touch</span>
          <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem' }}>
            Let&apos;s Create Something
            <br />
            <em style={{ color: 'var(--gold-light)' }}>Extraordinary Together.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Book a consultation, ask a question, or start your bespoke journey today.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'flex-start' }} className="contact-grid">

            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', marginBottom: '2rem' }}>Visit Our Atelier</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: <MapPin size={18} />, title: 'Address', text: '14 Akin Adesola Street\nVictoria Island, Lagos, Nigeria' },
                  { icon: <Phone size={18} />, title: 'Phone', text: '+234 801 234 5678\n+234 901 234 5679' },
                  { icon: <Mail size={18} />, title: 'Email', text: 'hello@ayanfeclothiers.com\nadmin@ayanfeclothiers.com' },
                  { icon: <Clock size={18} />, title: 'Hours', text: 'Mon–Fri: 9am – 6pm\nSat: 10am – 4pm' },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0, marginTop: 4 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: '0.25rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--color-text)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  background: '#25D366',
                  color: '#fff',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  fontSize: '0.9375rem',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>💬</span>
                Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--cream)', borderRadius: 'var(--radius-2xl)' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Check size={32} color="var(--color-primary)" />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Message Received!</h2>
                  <p style={{ color: 'var(--warm-gray)', lineHeight: 1.7 }}>
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Send a Message</h2>
                  <p style={{ color: 'var(--warm-gray)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
                    Fill in the form and we&apos;ll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Full Name *</label>
                        <input type="text" className={`input ${errors.guestName ? 'input-error' : ''}`} placeholder="Your name" {...register('guestName')} />
                        {errors.guestName && <span className="error-msg">{errors.guestName.message}</span>}
                      </div>
                      <div className="input-group">
                        <label className="input-label">Phone *</label>
                        <input type="tel" className={`input ${errors.guestPhone ? 'input-error' : ''}`} placeholder="+234 xxx xxx xxxx" {...register('guestPhone')} />
                        {errors.guestPhone && <span className="error-msg">{errors.guestPhone.message}</span>}
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Email *</label>
                      <input type="email" className={`input ${errors.guestEmail ? 'input-error' : ''}`} placeholder="your@email.com" {...register('guestEmail')} />
                      {errors.guestEmail && <span className="error-msg">{errors.guestEmail.message}</span>}
                    </div>

                    <div className="input-group">
                      <label className="input-label">Service Type</label>
                      <select className="input" {...register('serviceType')}>
                        <option value="general">General Enquiry</option>
                        <option value="bespoke">Bespoke Suit</option>
                        <option value="wedding">Wedding Package</option>
                        <option value="monogram">Monogram Service</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Preferred Date</label>
                        <input type="date" className="input" {...register('preferredDate')} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Preferred Time</label>
                        <select className="input" {...register('preferredTime')}>
                          <option value="">Any time</option>
                          <option value="morning">Morning (9am–12pm)</option>
                          <option value="afternoon">Afternoon (12pm–3pm)</option>
                          <option value="evening">Evening (3pm–6pm)</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Message</label>
                      <textarea className="input" rows={4} placeholder="Tell us more about your requirements..." style={{ resize: 'vertical' }} {...register('message')} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                      {loading ? 'Sending...' : <><Calendar size={18} /> Book Consultation</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
