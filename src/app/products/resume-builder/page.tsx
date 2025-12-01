import { generateMetadata } from "@/lib/generateMetadata";
import ResumeBuilderPage from "./ClientPage";

export const metadata = generateMetadata({
    title: "AI Resume Builder - Create ATS-Friendly Resumes | InterviewExceler.Ai",
    description: "Build professional, ATS-friendly resumes in minutes with our AI-powered resume builder. Get smart suggestions and instant formatting.",
    path: "/products/resume-builder",
});

export default function Page() {
    return <ResumeBuilderPage />;
}
