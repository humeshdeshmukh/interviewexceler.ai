import { AuthScreen } from "@/features/auth/components/AuthScreen";
import { generateMetadata as generateMetadataUtil } from "@/lib/generateMetadata";

export const metadata = generateMetadataUtil({
    title: "Sign In - Access Your Account | InterviewExceler.Ai",
    description: "Sign in to your InterviewExceler.Ai account to access mock interviews, resume builder, aptitude tests, and more career preparation tools.",
    path: "/auth",
});

export default function AuthPage() {
    return <AuthScreen />
}