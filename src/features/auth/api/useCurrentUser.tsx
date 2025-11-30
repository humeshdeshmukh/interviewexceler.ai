import { useAuth } from "@/features/auth/context/AuthContext";

// This function is to get the current login user
export const useCurrentUser = () => {
    const { user, loading } = useAuth();
    return { user, isLoading: loading };
}