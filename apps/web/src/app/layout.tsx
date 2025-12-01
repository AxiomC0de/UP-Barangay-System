import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeRegistry } from '@/theme';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Barangay U.P. Campus',
    default: 'Barangay U.P. Campus - Community Portal',
  },
  description:
    'The official community portal for Barangay U.P. Campus residents. Stay connected with announcements, submit concerns, and engage with your community.',
  keywords: [
    'Barangay UP Campus',
    'community portal',
    'UP Diliman',
    'barangay services',
    'community engagement',
  ],
  authors: [{ name: 'Barangay UP Campus' }],
  openGraph: {
    title: 'Barangay U.P. Campus - Community Portal',
    description:
      'The official community portal for Barangay U.P. Campus residents.',
    type: 'website',
    locale: 'en_PH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
