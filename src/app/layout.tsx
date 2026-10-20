import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://salman-dev-phi.vercel.app'),
  title: 'Salman | Full-Stack Developer ',
  description: 'An interactive VS Code-style full-stack developer portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'An interactive VS Code-style full-stack developer portfolio.',
    url: 'https://salman-dev-phi.vercel.app',
    siteName: 'My Portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Salman | Full-Stack Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'An interactive VS Code-style full-stack developer portfolio.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#181818] text-[#cccccc] font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
