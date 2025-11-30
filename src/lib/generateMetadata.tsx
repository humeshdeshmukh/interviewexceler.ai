import { Metadata } from "next";

// TODO: Customize it with your app details
// Replace title
// Replace Description
// Replace the image, you can build it using Canva, Figma, or any other tool you want to use 
// Replace the website URL with yours
// Replace the twitter handle with yours
// Replace the icons or favicons with yours

export function generateMetadata({
  title = "InterviewExceler.Ai - Master Your Interview Skills",
  description = "Elevate your career with InterviewExceler.Ai. Practice with AI-driven mock interviews, get personalized feedback, and land your dream job.",
  image = "/thumbnail.png",
  noIndex = false,
  verification = {},
  path = "",
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  verification?: {
    google?: string;
    yandex?: string;
    yahoo?: string;
    other?: Record<string, string | number | (string | number)[]>
  }
  path?: string
} = {}): Metadata {
  const baseUrl = 'https://www.interviewexceler.com';
  const fullImageUrl = image.startsWith('http') ? image : new URL(image, baseUrl).toString();
  const canonicalUrl = new URL(path, baseUrl).toString();

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: 'InterviewExceler.Ai',
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: 'InterviewExceler.Ai',
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@interviewexceler",
      site: "@interviewexceler"
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        url: '/favicon.ico',
      },
    ],
    metadataBase: new URL(baseUrl),
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
