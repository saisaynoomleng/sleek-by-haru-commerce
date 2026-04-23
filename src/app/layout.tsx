import type { Metadata } from 'next';
import './globals.css';
import { dmSans } from '@/lib/fonts';

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
      <body>{children}</body>
    </html>
  );
}
