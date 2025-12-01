import { generateMetadata } from "@/lib/generateMetadata";
import Contact from "./ClientPage";

export const metadata = generateMetadata({
  title: "Contact Us - Get in Touch | InterviewExceler.Ai",
  description: "Have questions? Contact the InterviewExceler.Ai team for support, inquiries, or feedback. We're here to help you succeed.",
  path: "/company/contact",
});

export default function Page() {
  return <Contact />;
}
