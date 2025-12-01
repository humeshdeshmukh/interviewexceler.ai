import { generateMetadata } from "@/lib/generateMetadata";
import PracticeTests from "./ClientPage";

export const metadata = generateMetadata({
  title: "Practice Tests - Standard & AI-Powered | InterviewExceler.Ai",
  description: "Take comprehensive practice tests to assess your skills. Choose from standard tests or AI-powered adaptive assessments.",
  path: "/products/Practice-Tests",
});

export default function Page() {
  return <PracticeTests />;
}
