"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
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
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    if (loading) {
        return <UserButtonLoading />;
    }

    if (!user) return null;

    const handleSignOut = async () => {
        try {
            await signOut();
            // Navigate and refresh
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const avatarFallback = user.email?.charAt(0).toUpperCase() || "U";
    const userName = user.user_metadata?.full_name || user.email || "User";
    const userImage = user.user_metadata?.avatar_url;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative" asChild>
                <Avatar className="h-8 w-8 border-2 border-[#fcba28] rounded-full hover:opacity-75 cursor-pointer transition-opacity duration-150">
                    <AvatarImage
                        alt={userName}
                        src={userImage}
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
                            alt={userName}
                            src={userImage}
                            className="object-cover w-full h-full"
                            style={{ maxWidth: '32px', maxHeight: '32px' }}
                        />
                        <AvatarFallback className="text-sm">{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{userName}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="h-10 cursor-pointer">
                    <LogOut className="size-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}