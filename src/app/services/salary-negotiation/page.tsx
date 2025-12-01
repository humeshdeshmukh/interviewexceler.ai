import { generateMetadata } from "@/lib/generateMetadata";
import SalaryNegotiationPage from "./ClientPage";

export const metadata = generateMetadata({
  title: "Salary Negotiation - Maximize Your Offer | InterviewExceler.Ai",
  description: "Learn how to negotiate your salary with confidence. Use our AI analysis or consult with negotiation experts.",
  path: "/services/salary-negotiation",
});

export default function Page() {
  return <SalaryNegotiationPage />;
}
