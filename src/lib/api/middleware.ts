import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ZodError } from 'zod';

export type ApiContext = {
    userId: string;
};

export async function withAuth(
    handler: (req: Request, context: ApiContext) => Promise<NextResponse>
) {
    return async (req: Request) => {
        try {
            const supabase = await createClient();
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            // Basic rate limiting could be added here

            return await handler(req, { userId: user.id });
        } catch (error) {
            console.error('API Error:', error);

            if (error instanceof ZodError) {
                return NextResponse.json(
                    { error: 'Validation Error', details: error.errors },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
}
