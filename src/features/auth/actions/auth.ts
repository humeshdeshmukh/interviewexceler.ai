'use server';

import { cookies } from 'next/headers';

export async function clearAuthCookies() {
    const cookieStore = cookies();
    
    // Clear all auth-related cookies
    cookieStore.delete('bypass_auth');
    cookieStore.delete('user-session');
    cookieStore.delete('convex-auth');
    
    // Add any other auth-related cookies that need to be cleared
}
