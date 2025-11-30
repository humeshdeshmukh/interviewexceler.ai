import "./globals.css";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils";
import { Noto_Sans } from 'next/font/google';
import { generateMetadata } from "@/lib/generateMetadata";
import NextTopLoader from 'nextjs-toploader';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ChatBot } from "@/components/ChatBot/ChatBot";

const font = Noto_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          font.className,
          "min-h-screen bg-background antialiased"
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <NextTopLoader showSpinner={false} color="#fcba28" />
          <div id="portal-root" />
          <Header />
          <AuthModal />
          <main>{children}</main>
          <ChatBot />
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
