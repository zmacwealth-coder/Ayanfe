import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const monogramRequestSchema = z.object({
  initials: z
    .string()
    .min(1, 'Initials required')
    .max(6, 'Maximum 6 characters')
    .regex(/^[A-Za-z.]+$/, 'Only letters and periods'),
  fullName: z.string().min(2, 'Full name required'),
  garmentType: z.string().min(1, 'Please select a garment type'),
  fabric: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  fontStyle: z.enum(['classic', 'modern', 'script', 'block']).default('classic'),
  placement: z.enum(['chest', 'cuff', 'collar', 'back', 'hem']).default('chest'),
  specialNotes: z.string().optional(),
  guestEmail: z.string().email().optional(),
  guestName: z.string().optional(),
  guestPhone: z.string().optional(),
});

export const consultationSchema = z.object({
  guestName: z.string().min(2, 'Name required'),
  guestPhone: z.string().min(10, 'Valid phone number required'),
  guestEmail: z.string().email('Valid email required'),
  serviceType: z.enum(['bespoke', 'wedding', 'monogram', 'general']),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  packageId: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Please provide more detail'),
});

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  phone: z.string().min(10, 'Valid phone required'),
  addressLine1: z.string().min(5, 'Address required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  country: z.string().default('Nigeria'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MonogramRequestInput = z.infer<typeof monogramRequestSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
