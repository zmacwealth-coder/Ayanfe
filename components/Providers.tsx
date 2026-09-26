'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a0033',
            color: '#faf8f5',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            border: '1px solid rgba(123, 31, 162, 0.3)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
          },
          success: {
            iconTheme: { primary: '#c9a84c', secondary: '#1a0033' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#faf8f5' },
          },
        }}
      />
    </SessionProvider>
  );
}
