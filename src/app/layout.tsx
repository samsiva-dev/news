import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewsCollector',
  description: 'Stay up to date with news across any topic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
