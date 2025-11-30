import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id, resumeData, atsScore } = await req.json();

        if (id) {
            // Update existing resume
            const { data, error } = await supabase
                .from("resumes" as any)
                .update({
                    content: resumeData,
                    ats_score: atsScore,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", id)
                .eq("user_id", user.id)
                .select()
                .single();

            if (error) throw error;
            return NextResponse.json(data);
        } else {
            // Create new resume
            const { data, error } = await supabase
                .from("resumes" as any)
                .insert({
                    user_id: user.id,
                    content: resumeData,
                    ats_score: atsScore,
                })
                .select()
                .single();

            if (error) throw error;
            return NextResponse.json(data);
        }

    } catch (error) {
        console.error("Error saving resume:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
