/**
 * Structured Data (JSON-LD) generators for SEO
 * These schemas help search engines understand your content better
 */

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export interface ProductSchemaData {
    name: string;
    description: string;
    image: string;
    offers?: {
        price: string;
        priceCurrency: string;
    };
}

// Organization Schema - Already in layout, but exportable for reuse
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InterviewExceler.Ai",
    "alternateName": "InterviewExceler",
    "url": "https://www.interviewexceler.com",
    "logo": "https://www.interviewexceler.com/logo.svg",
    "sameAs": [
        "https://twitter.com/interviewexceler",
        "https://www.linkedin.com/company/interviewexceler"
    ],
    "description": "Elevate your career with InterviewExceler.Ai. Practice with AI-driven mock interviews, get personalized feedback, and land your dream job.",
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": "https://www.interviewexceler.com/company/contact"
    }
};

// WebSite Schema with SearchAction for sitelinks search box
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InterviewExceler.Ai",
    "alternateName": "Interview Exceler",
    "url": "https://www.interviewexceler.com",
    "description": "AI-powered interview preparation platform with mock interviews, resume builder, and career coaching",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.interviewexceler.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
};

// Software Application Schema
export const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InterviewExceler.Ai",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free tier available with premium features"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
    },
    "description": "AI-powered interview preparation with mock interviews, real-time feedback, and personalized coaching",
    "featureList": [
        "AI Mock Interviews",
        "Resume Builder",
        "Skills Analyzer",
        "Aptitude Tests",
        "Career Coaching"
    ]
};

// Generate FAQ Schema
export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

// Generate Article Schema for blog posts
export function generateArticleSchema({
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author
}: {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image,
        "url": url,
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "InterviewExceler.Ai",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.interviewexceler.com/logo.svg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };
}

// Generate HowTo Schema
export function generateHowToSchema({
    title,
    description,
    steps,
    totalTime
}: {
    title: string;
    description: string;
    steps: { name: string; text: string }[];
    totalTime?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "description": description,
        "totalTime": totalTime || "PT30M",
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
        }))
    };
}

// Generate Product/Service Schema
export function generateServiceSchema({
    name,
    description,
    provider = "InterviewExceler.Ai",
    areaServed = "Worldwide",
    serviceType
}: {
    name: string;
    description: string;
    provider?: string;
    areaServed?: string;
    serviceType?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": provider
        },
        "areaServed": areaServed,
        "serviceType": serviceType || name
    };
}

// Common FAQs for the site
export const commonFAQs: FAQItem[] = [
    {
        question: "What is InterviewExceler.Ai?",
        answer: "InterviewExceler.Ai is an AI-powered interview preparation platform that offers mock interviews, resume building, skills analysis, and career coaching to help you land your dream job."
    },
    {
        question: "How does the AI mock interview work?",
        answer: "Our AI mock interview uses advanced language models to simulate real interview scenarios. It asks questions based on your target role, analyzes your responses in real-time, and provides detailed feedback on your communication, technical skills, and body language."
    },
    {
        question: "Is InterviewExceler.Ai free to use?",
        answer: "Yes! InterviewExceler.Ai offers a free tier with essential features. Premium features are available for users who want advanced analytics, unlimited mock interviews, and personalized coaching."
    },
    {
        question: "What types of interviews can I practice?",
        answer: "You can practice behavioral interviews, technical interviews, coding interviews, system design interviews, and role-specific interviews for various industries including tech, finance, consulting, and more."
    },
    {
        question: "How can I improve my interview skills with InterviewExceler?",
        answer: "Use our AI mock interviews to practice regularly, review the detailed feedback on each session, work on suggested improvement areas, use our resume builder to optimize your resume, and take our aptitude tests to strengthen your skills."
    }
];
