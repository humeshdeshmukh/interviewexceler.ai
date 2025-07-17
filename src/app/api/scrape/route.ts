import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Fetch the content from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML content
    const root = parse(html);

    let extractedContent = '';

    if (url.includes('linkedin.com')) {
      // LinkedIn specific extraction
      extractedContent = extractLinkedInContent(root);
    } else if (url.includes('github.com')) {
      // GitHub specific extraction
      extractedContent = extractGitHubContent(root);
    } else {
      // Generic extraction
      extractedContent = extractGenericContent(root);
    }

    return NextResponse.json({ content: extractedContent });

  } catch (error) {
    console.error('Error scraping content:', error);
    return NextResponse.json({ error: 'Failed to scrape content' }, { status: 500 });
  }
}

function extractLinkedInContent(root: any): string {
  // Remove scripts and styles
  root.querySelectorAll('script').forEach((el: any) => el.remove());
  root.querySelectorAll('style').forEach((el: any) => el.remove());

  // Extract profile headline
  const headline = root.querySelector('.top-card-layout__headline');
  if (headline) {
    const headlineText = headline.textContent.trim();
    if (headlineText) return `Headline: ${headlineText}`;
  }

  // Extract current position
  const position = root.querySelector('.experience-item__title');
  if (position) {
    const positionText = position.textContent.trim();
    if (positionText) return `Current Position: ${positionText}`;
  }

  // Extract skills
  const skills = root.querySelectorAll('.skills-section .skill-pill');
  if (skills.length > 0) {
    const skillsText = Array.from(skills).map((el: any) => el.textContent.trim()).join(', ');
    return `Skills: ${skillsText}`;
  }

  // Fallback to main content
  const mainContent = root.querySelector('main');
  if (mainContent) {
    return mainContent.textContent.trim();
  }

  // Fallback to body content
  const body = root.querySelector('body');
  return body ? body.textContent.trim() : '';
}

function extractGitHubContent(root: any): string {
  // Remove scripts and styles
  root.querySelectorAll('script').forEach((el: any) => el.remove());
  root.querySelectorAll('style').forEach((el: any) => el.remove());

  // Extract bio
  const bio = root.querySelector('.user-profile-bio');
  if (bio) {
    const bioText = bio.textContent.trim();
    if (bioText) return `Bio: ${bioText}`;
  }

  // Extract pinned repositories
  const pinnedRepos = root.querySelectorAll('.pinned-item-list-item');
  if (pinnedRepos.length > 0) {
    const pinnedReposText = Array.from(pinnedRepos).map((el: any) => {
      const name = el.querySelector('.repo').textContent.trim();
      const description = el.querySelector('.pinned-item-desc').textContent.trim();
      return `${name}: ${description}`;
    }).join('\n');
    return `Pinned Repositories:\n${pinnedReposText}`;
  }

  // Extract contribution activity
  const contributions = root.querySelector('.js-yearly-contributions');
  if (contributions) {
    const contributionsText = contributions.textContent.trim();
    if (contributionsText) return `Activity: ${contributionsText}`;
  }

  // Extract README content
  const readme = root.querySelector('#readme');
  if (readme) {
    return readme.textContent.trim();
  }

  // Extract repository description
  const repoAbout = root.querySelector('.f4.my-3');
  if (repoAbout) {
    return repoAbout.textContent.trim();
  }

  return '';
}

function extractGenericContent(root: any): string {
  // Remove scripts and styles
  root.querySelectorAll('script').forEach((el: any) => el.remove());
  root.querySelectorAll('style').forEach((el: any) => el.remove());

  // Extract main content from common content areas
  const contentSelectors = [
    'main',
    'article',
    '.content',
    '#content',
    '.main-content',
    '#main-content',
  ];

  for (const selector of contentSelectors) {
    const content = root.querySelector(selector);
    if (content) {
      return content.textContent.trim().substring(0, 1000); // Limit content length
    }
  }

  // Fallback to body text if no content found
  const body = root.querySelector('body');
  return body ? body.textContent.trim().substring(0, 1000) : '';
}
