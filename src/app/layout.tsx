import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZappyKiwify - Painel de Notificações',
  description: 'Gerencie notificações automatizadas entre Kiwify e Zappy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="page-container">
          {children}
        </div>
      </body>
    </html>
  );
}