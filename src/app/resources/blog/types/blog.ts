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
  category: string;
  readTime: string;
  author: string;
  referralLinks: ReferralLink[];
}

export interface BlogFilterState {
  search: string;
  category: string;
  page: number;
}
