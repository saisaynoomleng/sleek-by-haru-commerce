import type { Metadata } from 'next';
import './globals.css';
import { dmSans } from '@/lib/fonts';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: {
    default: 'Sleek',
    template: '%s | Sleek',
  },
  description:
    'Discover Sleek: A science-backed skincare destination offering premium, dermatologist-vetted formulas. Shop our collection online or visit one of our physical store locations across the U.S. for personalized skincare expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="lg:max-w-300 lg:mx-auto">
        <ClerkProvider>{children}</ClerkProvider>
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
