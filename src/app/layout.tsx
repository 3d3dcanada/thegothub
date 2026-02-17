import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'THE GOT HUB - Open Source Project Discovery',
  description: 'Discover open source projects from GitHub, GitLab, SourceForge, and Hugging Face. Find, explore, and connect with developers worldwide.',
  keywords: ['open source', 'github', 'gitlab', 'sourceforge', 'hugging face', 'discover projects', 'developer tools'],
  authors: [{ name: 'THE GOT HUB' }],
  openGraph: {
    title: 'THE GOT HUB - Open Source Project Discovery',
    description: 'Discover open source projects from GitHub, GitLab, SourceForge, and Hugging Face.',
    type: 'website',
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
