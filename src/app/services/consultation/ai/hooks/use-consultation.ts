import { useState, useCallback, useEffect } from 'react';
import { getGeminiStream, generateTitle, CareerProfile, ChatMessage as GeminiMessage } from '../gemini-service';
import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface Session {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    messageCount?: number;
}

export function useConsultation() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [consultationId, setConsultationId] = useState<string | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const supabase = createClient();

    // Fetch all sessions on mount
    useEffect(() => {
        const initSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await fetchSessions();
        };
        initSession();
    }, []);

    const saveMessageToSupabase = async (message: Message, currentConsultationId: string) => {
        try {
            const { error } = await (supabase as any)
                .from('consultation_messages')
                .insert({
                    consultation_id: currentConsultationId,
                    role: message.role,
                    content: message.content,
                    created_at: message.timestamp.toISOString()
                });

            if (error) {
                console.error('Supabase error saving message:', error);
            }
        } catch (error) {
            console.error('Error saving message to Supabase:', error);
        }
    };

    const createConsultationIfNeeded = async () => {
        if (consultationId) return consultationId;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.warn('No user found - skipping Supabase consultation creation');
            return null;
        }

        try {
            const { data, error } = await (supabase as any)
                .from('consultations')
                .insert({
                    user_id: user.id,
                    topic: 'career-guidance',
                    title: 'New Chat',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                console.error('Supabase error creating consultation:', error);
                return null;
            }

            setConsultationId(data.id);
            await fetchSessions();
            return data.id;
        } catch (error) {
            console.error('Error creating consultation:', error);
            return null;
        }
    };

    // Fetch all sessions
    const fetchSessions = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { data, error } = await (supabase as any)
                .from('consultations')
                .select('id, title, topic, created_at, updated_at')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (!error && data) {
                setSessions(data.map((s: any) => ({
                    ...s,
                    title: s.title || 'New Chat',
                    created_at: new Date(s.created_at),
                    updated_at: new Date(s.updated_at)
                })));
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    // Create new session
    const createNewSession = async () => {
        setMessages([]);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { data, error } = await (supabase as any)
                .from('consultations')
                .insert({
                    user_id: user.id,
                    topic: 'career-guidance',
                    title: 'New Chat',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                // If error is missing column, try without title
                if (error.code === 'PGRST204' || error.message?.includes('title')) {
                    const { data: retryData, error: retryError } = await (supabase as any)
                        .from('consultations')
                        .insert({
                            user_id: user.id,
                            topic: 'career-guidance',
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        })
                        .select()
                        .single();

                    if (!retryError) {
                        setConsultationId(retryData.id);
                        await fetchSessions();
                        toast.success('New chat created');
                        return;
                    }
                }

                console.error('Error creating new session:', JSON.stringify(error, null, 2));
                toast.error(`Failed to create session: ${error.message || 'Unknown error'}`);
                return;
            }

            setConsultationId(data.id);
            await fetchSessions();
            toast.success('New chat created');
        } catch (error) {
            console.error('Error creating new session:', error);
        }
    };

    // Switch to different session
    const switchSession = async (sessionId: string) => {
        setConsultationId(sessionId);

        const { data: dbMessages } = await (supabase as any)
            .from('consultation_messages')
            .select('*')
            .eq('consultation_id', sessionId)
            .order('created_at', { ascending: true });

        if (dbMessages) {
            setMessages(dbMessages.map((msg: any) => ({
                id: msg.id,
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
                timestamp: new Date(msg.created_at)
            })));
        } else {
            setMessages([]);
        }
    };

    // Delete session
    const deleteSession = async (sessionId: string) => {
        try {
            await (supabase as any)
                .from('consultations')
                .delete()
                .eq('id', sessionId);

            setSessions(prev => prev.filter(s => s.id !== sessionId));

            if (sessionId === consultationId) {
                createNewSession();
            }

            toast.success('Session deleted');
        } catch (error) {
            console.error('Error deleting session:', error);
            toast.error('Failed to delete session');
        }
    };

    // Update session title
    const updateSessionTitle = async (sessionId: string, title: string) => {
        try {
            await (supabase as any)
                .from('consultations')
                .update({
                    title: title.slice(0, 50),
                    updated_at: new Date().toISOString()
                })
                .eq('id', sessionId);

            await fetchSessions();
        } catch (error) {
            console.error('Error updating title:', error);
        }
    };

    const sendMessage = useCallback(async (content: string, profile?: CareerProfile) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: uuidv4(),
            role: 'user',
            content,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const currentConsultationId = await createConsultationIfNeeded();
        if (currentConsultationId) {
            saveMessageToSupabase(userMessage, currentConsultationId);

            // Auto-generate title from first message
            if (messages.length === 0) {
                // Generate AI title
                generateTitle(content).then(aiTitle => {
                    updateSessionTitle(currentConsultationId, aiTitle);
                });
            }
        }

        try {
            const history: GeminiMessage[] = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: msg.content
            }));

            const stream = await getGeminiStream(content, history, profile);

            let fullResponse = '';
            const assistantMessageId = uuidv4();

            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                timestamp: new Date()
            }]);

            // Collect all chunks
            for await (const chunk of stream) {
                fullResponse += chunk.text();
            }

            // Word-by-word typing effect
            const words = fullResponse.split(' ');
            let displayedText = '';

            for (let i = 0; i < words.length; i++) {
                displayedText += (i === 0 ? '' : ' ') + words[i];

                setMessages(prev => prev.map(msg =>
                    msg.id === assistantMessageId
                        ? { ...msg, content: displayedText }
                        : msg
                ));

                await new Promise(resolve => setTimeout(resolve, 80));
            }

            if (currentConsultationId) {
                saveMessageToSupabase({
                    id: assistantMessageId,
                    role: 'assistant',
                    content: fullResponse,
                    timestamp: new Date()
                }, currentConsultationId);
            }

        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to get response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [messages, consultationId]);

    const loadHistory = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: consultations } = await (supabase as any)
            .from('consultations')
            .select('id')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

        if (consultations && consultations.length > 0) {
            const recentId = consultations[0].id;
            await switchSession(recentId);
        }
    };

    return {
        messages,
        isLoading,
        sendMessage,
        loadHistory,
        sessions,
        activeSessionId: consultationId,
        createNewSession,
        switchSession,
        deleteSession
    };
}
