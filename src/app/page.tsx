
import { FAQ } from "@/features/landing-page/components/faq/FAQ";
import { Hero } from "@/features/landing-page/components/hero/Hero";
import { Features } from "@/features/landing-page/components/features/Features";


export default function Home() {
  return (
    <main className="bg-background w-full">
      <Hero />
      {/* <Features />  */}
      <FAQ />

    </main>
  );
}
