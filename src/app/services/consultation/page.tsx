import { generateMetadata } from "@/lib/generateMetadata";
import ConsultationPage from "./ClientPage";

export const metadata = generateMetadata({
  title: "Career Consultation - AI & Professional Guidance | InterviewExceler.Ai",
  description: "Get personalized career guidance through our AI career consultant or book sessions with professional career coaches.",
  path: "/services/consultation",
});

export default function Page() {
  return <ConsultationPage />;
}
