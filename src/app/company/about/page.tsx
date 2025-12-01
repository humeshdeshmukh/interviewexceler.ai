import { generateMetadata } from "@/lib/generateMetadata";
import About from "./ClientPage";

export const metadata = generateMetadata({
  title: "About Us - Our Mission & Team | InterviewExceler.Ai",
  description: "Learn about InterviewExceler.Ai's mission to democratize interview preparation. Meet our team and discover our vision for the future of career growth.",
  path: "/company/about",
});

export default function Page() {
  return <About />;
}
