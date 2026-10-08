import React from 'react';

export const metadata = {
  title: 'Salman | Frontend Developer',
  description: 'Salman — Frontend Developer building modern, responsive web experiences with a clean dark UI.',
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
