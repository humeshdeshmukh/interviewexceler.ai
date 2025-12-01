import { generateMetadata } from "@/lib/generateMetadata";
import MockInterviewLanding from "./ClientPage";

export const metadata = generateMetadata({
  title: "AI Mock Interviews - Practice & Improve | InterviewExceler.Ai",
  description: "Practice with our advanced AI mock interview simulator. Get real-time feedback on your answers, body language, and speaking pace.",
  path: "/products/mock-interviews",
});

export default function Page() {
  return <MockInterviewLanding />;
}
