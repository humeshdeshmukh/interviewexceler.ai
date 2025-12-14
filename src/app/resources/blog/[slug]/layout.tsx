import { Metadata } from 'next';
import { blogPosts, getPostBySlug } from '../data/posts';
import { generateArticleSchema } from '@/lib/structuredData';

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | InterviewExceler.Ai',
            description: 'The requested blog post could not be found.',
        };
    }

    const baseUrl = 'https://www.interviewexceler.com';
    const postUrl = `${baseUrl}${post.link}`;
    const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/thumbnail.png`;

    return {
        title: `${post.title} | InterviewExceler.Ai Blog`,
        description: post.excerpt,
        keywords: post.keywords || [],
        authors: [{ name: post.author }],
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url: postUrl,
            siteName: 'InterviewExceler.Ai',
            publishedTime: new Date(post.date).toISOString(),
            authors: [post.author],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
            creator: '@interviewexceler',
        },
        alternates: {
            canonical: postUrl,
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    };
}

export default function BlogPostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
