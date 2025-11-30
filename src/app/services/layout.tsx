import "../globals.css";

import { cn } from "@/lib/utils";
import { Noto_Sans } from 'next/font/google';
import { Analytics } from "@/lib/analytics/Analytics";
import { generateMetadata } from "@/lib/generateMetadata";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";

const font = Noto_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata = generateMetadata();

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(font.className, "min-h-screen bg-background antialiased")}>
      <NextTopLoader showSpinner={false} color="#fcba28" />
      <Toaster />
      <main className="container mx-auto px-6 py-10">
        {children}
      </main>
      <Analytics />
    </div>
  );
}
