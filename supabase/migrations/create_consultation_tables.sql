-- Create consultations table
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL DEFAULT 'career-guidance',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_messages table
CREATE TABLE IF NOT EXISTS public.consultation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id UUID NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_messages_consultation_id ON public.consultation_messages(consultation_id);
CREATE INDEX IF NOT EXISTS idx_consultation_messages_created_at ON public.consultation_messages(created_at);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for consultations table
CREATE POLICY "Users can view their own consultations"
    ON public.consultations
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consultations"
    ON public.consultations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consultations"
    ON public.consultations
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own consultations"
    ON public.consultations
    FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for consultation_messages table
CREATE POLICY "Users can view messages from their consultations"
    ON public.consultation_messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.consultations
            WHERE consultations.id = consultation_messages.consultation_id
            AND consultations.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create messages in their consultations"
    ON public.consultation_messages
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.consultations
            WHERE consultations.id = consultation_messages.consultation_id
            AND consultations.user_id = auth.uid()
        )
    );

-- Grant permissions
GRANT ALL ON public.consultations TO authenticated;
GRANT ALL ON public.consultation_messages TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.consultations IS 'Stores AI consultation sessions';
COMMENT ON TABLE public.consultation_messages IS 'Stores messages within consultation sessions';
