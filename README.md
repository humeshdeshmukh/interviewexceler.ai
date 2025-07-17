# Setup Guide

Hi humesh deshmukh👋

In this guide, I will walk you through the process of setting up your Premium Kit, including installation, Convex backend configuration, authentication, and Stripe integration.

You can also find this in the [website documentation](https://www.devvault.dev/docs).

## Table of Contents
- [Installation Guide](https://www.devvault.dev/docs/installation)
- [Convex Setup](https://www.devvault.dev/docs/getting-started/convex-setup)
- [Authentication Setup](https://www.devvault.dev/docs/getting-started/authentication-setup)
- [Stripe Setup](https://www.devvault.dev/docs/getting-started/stripe-setup)

## Installation Guide

After purchasing the kit, you'll receive an email with instructions to clone the repository. Follow these steps to get started:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-folder>

# Remove the original remote
git remote remove origin

# Create and configure your own repository
# Add your new remote origin

# Install dependencies
npm i

# Set up environment variables
mv .env.example .env.local
```

## Convex Setup

Learn how to set up your backend server using Convex.

**Important**: Complete the installation process before proceeding.

1. Navigate to the project directory and run:
   ```bash
   npx convex dev
   ```

2. When prompted, select:
   - Option 1: "Create A New Project"
   - Enter your app name

That's it! Your backend is now deployed.

## Authentication Setup

### Setting up Convex Auth

1. Install required dependencies:
   ```bash
   npm install @convex-dev/auth @auth/core@0.36.0
   ```

2. Run the initial setup:
   ```bash
   npx @convex-dev/auth
   ```
   When prompted about the URL of the local web server, simply press Enter.

### Configuring Google OAuth

1. Visit the [Google Cloud Console](https://console.cloud.google.com/)

2. **OAuth Consent Screen Setup**:
   - Enter your app name
   - Add your email in "User support email"
   - (Optional) Add your logo
   - Under "Authorized Domains", add: `https://name-name-123.convex.site`
   - Add your email in "Developer contact information"
   - Complete the setup by clicking "Save and Continue"

3. **Credentials Setup**:
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Configure the following:
     - Authorized JavaScript Origins: `http://localhost:3000`
     - Authorized Redirect URLs: `https://name-name-123.convex.site/api/auth/callback/google`
   - Click "Create"

4. **Configure Convex Environment**:
   - In your Convex project settings:
     - Add `AUTH_GOOGLE_ID` environment variable with your Google Client ID
     - Add `AUTH_GOOGLE_SECRET` environment variable with your Google Client Secret

## Stripe Setup

1. **Configure Stripe Secret Key**:
   - Create an account on [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to Developers → API Keys
   - Copy the Secret key
   - Add to Convex Environment Variables as `STRIPE_API_KEY`

2. **Configure Publishable Key**:
   - Copy the Publishable key from Stripe dashboard
   - Add to Convex Environment Variables as `STRIPE_KEY`

3. **Set up Webhooks**:
   - Run in your terminal:
     ```bash
     npm run stripe:listen
     ```
   - Copy the webhook signing secret (`whsec_81...`)
   - Add to Convex Environment Variables as `STRIPE_WEBHOOKS_SECRET`

4. **Enable Stripe Functions**:
   - Uncomment the functions in the `/convex` folder:
     - `payments`
     - `stripe`
     - `users`

---

For more detailed information about how to use the tools we just installed, visit the [official documentation](https://www.devvault.dev/docs).# devvault-kit
#  i n t e r v i e w m a s t e r . a i - d e v o p s

#  i n t e r v i e w m a s t e r . a i - d e v o p s

#  i n t e r v i e w m a s t e r . a i - d e v o p s

#  i n t e r v i e w m a s t e r . a i - d e v o p s

#  i n t e r v i e w m a s t e r . a i - d e v o p s

#  i n t e r v i e w m a s t e r . a i - d e v o p s