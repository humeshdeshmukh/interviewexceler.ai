import "../globals.css";
import { cn } from "@/lib/utils";
import { Noto_Sans } from 'next/font/google';
import { Analytics } from "@/lib/analytics/Analytics";
import { generateMetadata } from "@/lib/generateMetadata";
import { ConvexClientProvider } from "@/providers/ConvexAuthProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";

const font = Noto_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata = generateMetadata();

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <div className={cn(font.className, "min-h-screen bg-background antialiased")}>
        <ConvexClientProvider>
          {/* Top loader with a custom theme color */}
          <NextTopLoader showSpinner={false} color="#fcba28" />
          <Toaster />
          <main className="container mx-auto p-6">
            {children}
          </main>
        </ConvexClientProvider>
        <Analytics />
      </div>
    </ConvexAuthNextjsServerProvider>
  );
}
