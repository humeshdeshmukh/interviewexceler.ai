
import { FAQ } from "@/features/landing-page/components/faq/FAQ";
import { Hero } from "@/features/landing-page/components/hero/Hero";
import { Features } from "@/features/landing-page/components/features/Features";
import { generateMetadata } from "@/lib/generateMetadata";

export const metadata = generateMetadata({
  title: "InterviewExceler.Ai - AI Mock Interviews & Resume Builder",
  description: "Master your interview skills with AI-powered mock interviews, get instant feedback, and build ATS-friendly resumes. Start practicing for free today!",
  keywords: [
    "AI mock interview",
    "interview practice",
    "resume builder",
    "career coaching",
    "interview preparation",
    "job interview tips",
    "behavioral interview questions",
    "technical interview practice"
  ],
  path: "/",
});


export default function Home() {
  return (
    <main className="bg-background w-full">
      <Hero />
      {/* <Features />  */}
      <FAQ />

    </main>
  );
}
