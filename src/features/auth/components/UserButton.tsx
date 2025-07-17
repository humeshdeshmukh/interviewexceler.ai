"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { useRouter } from "next/navigation";
import { clearAuthCookies } from "../actions/auth";

import { LogOut } from "lucide-react";

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { UserButtonLoading } from "./UserButtonLoading";

export const UserButton = () => {
    const { signOut } = useAuthActions();
    const { user, isLoading } = useCurrentUser();
    const router = useRouter();

    if (isLoading) {
        return <UserButtonLoading />;
    }

    if (!user) return null;

    const handleSignOut = async () => {
        try {
            await signOut();
            // Clear cookies using server action
            await clearAuthCookies();
            // Clear client-side state
            localStorage.removeItem('user-session');
            // Navigate and refresh
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const avatarFallback = user.name!.charAt(0).toUpperCase();
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative" asChild>
                <Avatar className="h-8 w-8 border-2 border-[#fcba28] rounded-full hover:opacity-75 cursor-pointer transition-opacity duration-150">
                    <AvatarImage 
                        alt={user.name!} 
                        src={user.image!} 
                        className="object-cover w-full h-full"
                        style={{ maxWidth: '32px', maxHeight: '32px' }}
                    />
                    <AvatarFallback className="text-sm text-foreground bg-background border-2 border-[#fcba28]">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60 bg-background border-none shadow-xl shadow-neutral-900 text-foreground">
                <div className="px-2 py-1.5 flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-[#fcba28] rounded-full">
                        <AvatarImage 
                            alt={user.name!} 
                            src={user.image!}
                            className="object-cover w-full h-full"
                            style={{ maxWidth: '32px', maxHeight: '32px' }}
                        />
                        <AvatarFallback className="text-sm">{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}