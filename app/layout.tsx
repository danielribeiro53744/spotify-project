import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MusicPlayer from '@/components/player/MusicPlayer';
import { AuthProvider } from '@/contexts/AuthContext';
import { MusicProvider } from '@/contexts/MusicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MusicFlow - Your Personal Music Experience',
  description: 'Discover, create playlists, and enjoy your favorite music with MusicFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MusicProvider>
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                {children}
              </main>
              <Footer />
              <MusicPlayer />
            </div>
          </MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}