# Interview Exceler AI

Welcome to **Interview Exceler AI**! 🚀

An AI-powered interview preparation platform designed to help candidates master their interview skills with real-time feedback, mock interviews, and personalized coaching.

## ✨ Features

- **AI Mock Interviews**: Practice with realistic, AI-driven interview scenarios.
- **Real-time Feedback**: Get instant analysis on your answers, tone, and confidence.
- **Interview History**: Track your progress and review past sessions.
- **Customizable Tracks**: Choose from various industries and job roles.
- **Premium Features**: Integrated with Stripe for seamless subscription management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/)
- **AI Engine**: [Google Gemini AI](https://ai.google.dev/)
- **Authentication**: Supabase Auth
- **Payments**: [Stripe](https://stripe.com/)
- **UI Components**: Radix UI, Lucide React, Framer Motion

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd interviewexceler.ai_next.js-devops-master
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Gemini AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin / Email Settings
ADMIN_EMAIL=your_admin_email
EMAIL_PASS=your_email_app_password
```

### 4. Supabase Setup

1. Create a new project on [Supabase Dashboard](https://supabase.com/dashboard).
2. Run the provided SQL migrations found in the `/supabase` or root directory to set up your tables (e.g., `interview_profiles_migration.sql`).
3. Configure your Auth settings in Supabase (Google OAuth, etc.).

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Documentation

For detailed instructions on how to use the platform, please refer to [HOW_TO_USE.md](./HOW_TO_USE.md).
