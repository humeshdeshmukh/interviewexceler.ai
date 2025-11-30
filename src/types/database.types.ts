export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    subscription_tier: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    subscription_tier?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    subscription_tier?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            user_profiles: {
                Row: {
                    id: string
                    user_id: string
                    resume_url: string | null
                    target_role: string | null
                    experience_level: string | null
                    skills: Json
                    preferences: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    user_id: string
                    resume_url?: string | null
                    target_role?: string | null
                    experience_level?: string | null
                    skills?: Json
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    resume_url?: string | null
                    target_role?: string | null
                    experience_level?: string | null
                    skills?: Json
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            interview_sessions: {
                Row: {
                    id: string
                    user_id: string
                    session_type: string
                    category: string | null
                    difficulty: string | null
                    status: string
                    started_at: string
                    completed_at: string | null
                    total_score: number | null
                    metadata: Json
                }
                Insert: {
                    id?: string
                    user_id: string
                    session_type: string
                    category?: string | null
                    difficulty?: string | null
                    status?: string
                    started_at?: string
                    completed_at?: string | null
                    total_score?: number | null
                    metadata?: Json
                }
                Update: {
                    id?: string
                    user_id?: string
                    session_type?: string
                    category?: string | null
                    difficulty?: string | null
                    status?: string
                    started_at?: string
                    completed_at?: string | null
                    total_score?: number | null
                    metadata?: Json
                }
            }
            interview_responses: {
                Row: {
                    id: string
                    session_id: string
                    question_id: string | null
                    question_text: string
                    user_answer: string | null
                    ai_feedback: Json | null
                    score: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    session_id: string
                    question_id?: string | null
                    question_text: string
                    user_answer?: string | null
                    ai_feedback?: Json | null
                    score?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    session_id?: string
                    question_id?: string | null
                    question_text?: string
                    user_answer?: string | null
                    ai_feedback?: Json | null
                    score?: number | null
                    created_at?: string
                }
            }
            practice_tests: {
                Row: {
                    id: string
                    user_id: string
                    test_type: string
                    topics: string[] | null
                    difficulty: string | null
                    questions: Json
                    answers: Json | null
                    score: number | null
                    completed: boolean
                    created_at: string
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    test_type: string
                    topics?: string[] | null
                    difficulty?: string | null
                    questions: Json
                    answers?: Json | null
                    score?: number | null
                    completed?: boolean
                    created_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    test_type?: string
                    topics?: string[] | null
                    difficulty?: string | null
                    questions?: Json
                    answers?: Json | null
                    score?: number | null
                    completed?: boolean
                    created_at?: string
                    completed_at?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
