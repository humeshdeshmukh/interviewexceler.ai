import { generateMetadata } from "@/lib/generateMetadata";
import Careers from "./ClientPage";

export const metadata = generateMetadata({
  title: "Careers - Join Our Team | InterviewExceler.Ai",
  description: "Join InterviewExceler.Ai and help revolutionize career preparation. Explore open positions and become part of our mission.",
  path: "/company/careers",
});

export default function Page() {
  return <Careers />;
}
