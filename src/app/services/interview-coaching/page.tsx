import { generateMetadata } from "@/lib/generateMetadata";
import InterviewCoachingPage from "./ClientPage";

export const metadata = generateMetadata({
  title: "Interview Coaching - AI & Professional Coaching | InterviewExceler.Ai",
  description: "Master your interview skills with our AI interview coach or book personalized sessions with industry experts.",
  path: "/services/interview-coaching",
});

export default function Page() {
  return <InterviewCoachingPage />;
}