import { generateMetadata } from "@/lib/generateMetadata";
import AptitudeAIPage from "./ClientPage";

export const metadata = generateMetadata({
  title: "Aptitude AI - Master Aptitude Tests | InterviewExceler.Ai",
  description: "Prepare for aptitude tests with AI-driven practice questions. Improve your quantitative, logical, and verbal reasoning skills.",
  path: "/products/aptitude-ai",
});

export default function Page() {
  return <AptitudeAIPage />;
}
