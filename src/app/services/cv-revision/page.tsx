import { generateMetadata } from "@/lib/generateMetadata";
import CVRevisionPage from "./ClientPage";

export const metadata = generateMetadata({
  title: "CV Revision Services - AI Analysis & Expert Review | InterviewExceler.Ai",
  description: "Optimize your CV with our AI analysis tool or get detailed feedback from professional CV experts. Increase your interview chances.",
  path: "/services/cv-revision",
});

export default function Page() {
  return <CVRevisionPage />;
}
