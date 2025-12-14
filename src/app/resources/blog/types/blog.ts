export interface ReferralLink {
  title: string;
  url: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  slug: string; // URL-friendly slug
  category: string;
  readTime: string;
  author: string;
  referralLinks: ReferralLink[];
  content?: string; // Full article content in markdown
  keywords?: string[]; // SEO keywords
  image?: string; // Featured image
}

export interface BlogFilterState {
  search: string;
  category: string;
  page: number;
}
