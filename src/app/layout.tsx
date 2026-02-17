import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import './globals.css';

export const favicon = {
  icon: '/icon.svg',
  apple: '/icon.svg',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thegothub.vercel.app'),
  title: {
    default: 'TheGotHub - Discover Open Source Projects',
    template: '%s | TheGotHub',
  },
  description: 'Discover and explore open source projects from GitHub, GitLab, SourceForge and more. Find trending repositories, free software, and connect with developers worldwide.',
  keywords: ['open source', 'github', 'gitlab', 'sourceforge', 'hugging face', 'discover projects', 'developer tools', 'free software', 'trending repos', 'open source discovery'],
  authors: [{ name: '3d3dcanada' }],
  creator: '3d3dcanada',
  publisher: '3d3dcanada',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thegothub.vercel.app',
    siteName: 'TheGotHub',
    title: 'TheGotHub - Discover Open Source Projects',
    description: 'Discover and explore open source projects from GitHub, GitLab, SourceForge and more. Find trending repositories, free software, and connect with developers worldwide.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TheGotHub - Open Source Project Discovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheGotHub - Discover Open Source Projects',
    description: 'Discover and explore open source projects from GitHub, GitLab, SourceForge and more.',
    images: ['/og-image.svg'],
    creator: '@3d3dcanada',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
