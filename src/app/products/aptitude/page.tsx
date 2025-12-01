import { generateMetadata } from "@/lib/generateMetadata";
import AptitudePage from "./ClientPage";

export const metadata = generateMetadata({
  title: "Aptitude Practice - Topics & Progress | InterviewExceler.Ai",
  description: "Practice aptitude topics, track your progress, and improve your speed and accuracy with our comprehensive aptitude training.",
  path: "/products/aptitude",
});

export default function Page() {
  return <AptitudePage />;
}
