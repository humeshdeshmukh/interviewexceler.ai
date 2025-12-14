import { blogPosts } from '@/app/resources/blog/data/posts';

export async function GET() {
    const baseUrl = 'https://www.interviewexceler.com';

    const rssItems = blogPosts.map(post => {
        // Convert date string to RFC 822 format
        const pubDate = new Date(post.date).toUTCString();

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${post.link}</link>
      <guid isPermaLink="true">${baseUrl}${post.link}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>info@interviewexceler.com (${post.author})</author>
      <category>${post.category}</category>
    </item>`;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>InterviewExceler.Ai Blog</title>
    <link>${baseUrl}/resources/blog</link>
    <description>Expert tips, guides, and insights on interview preparation, career growth, and landing your dream job with AI-powered tools.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>InterviewExceler.Ai</title>
      <link>${baseUrl}</link>
    </image>
    <managingEditor>info@interviewexceler.com (InterviewExceler Team)</managingEditor>
    <webMaster>info@interviewexceler.com (InterviewExceler Team)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} InterviewExceler.Ai. All rights reserved.</copyright>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
