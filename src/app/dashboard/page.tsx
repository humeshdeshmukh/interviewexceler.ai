import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
    title: 'My Dashboard - Interview Practice Analytics | InterviewExceler.ai',
    description: 'Track your interview practice progress, view performance analytics, and get AI-powered insights to improve your interview skills.',
    keywords: [
        'interview dashboard',
        'practice analytics',
        'interview progress',
        'AI insights',
        'performance tracking',
        'mock interview stats'
    ],
    openGraph: {
        title: 'My Dashboard - Interview Practice Analytics',
        description: 'Track your interview practice progress with detailed analytics and AI-powered insights.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Dashboard - Interview Practice Analytics',
        description: 'Track your progress and get personalized insights.',
    },
};

export default function DashboardPage() {
    return <DashboardClient />;
}
