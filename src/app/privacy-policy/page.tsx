import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InterviewExceler.Ai - Privacy Policy",
  description: "Our commitment to protecting your privacy while using our AI interview coaching platform."
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
          Privacy Policy
        </h1>

        <div className="space-y-12 text-gray-300">
          <section>
            <p className="mb-4"><strong>Effective Date:</strong> January 13, 2025</p>
            <p className="mb-4"><strong>Last Updated:</strong> January 13, 2025</p>

            <p className="mb-4">
              Welcome to <strong>InterviewExceler.Ai</strong> (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). This Privacy Policy explains how we collect, use, and protect your personal information when you use our AI-powered interview coaching platform.
            </p>
            <p className="mb-4">
              By using InterviewExceler.Ai, you agree to the terms of this Privacy Policy. We take your privacy seriously and are committed to protecting your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">1. Information We Collect</h2>

            <h3 className="text-xl font-medium mb-4 text-white">a. Interview-Related Information</h3>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>Video recordings of practice interviews</li>
              <li>Audio recordings and transcripts</li>
              <li>Interview responses and feedback</li>
              <li>Performance metrics and analytics</li>
            </ul>

            <h3 className="text-xl font-medium mb-4 text-white">b. Account Information</h3>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>Name and email address</li>
              <li>Professional background</li>
              <li>Interview preferences</li>
              <li>Account settings</li>
            </ul>

            <h3 className="text-xl font-medium mb-4 text-white">c. Usage Data</h3>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>Practice session statistics</li>
              <li>Feature usage patterns</li>
              <li>Performance metrics</li>
              <li>Technical data (IP address, browser type, device info)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li><strong>Interview Coaching</strong>: Providing personalized AI feedback and recommendations</li>
              <li><strong>Platform Improvement</strong>: Enhancing our AI models and coaching algorithms</li>
              <li><strong>User Experience</strong>: Customizing and improving the platform interface</li>
              <li><strong>Analytics</strong>: Understanding user behavior and platform performance</li>
              <li><strong>Security</strong>: Protecting your account and preventing unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">3. AI Training and Data Usage</h2>
            <p className="mb-4">
              Our AI models are trained using anonymized interview data. Before using any data for training:
            </p>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>All personal identifiers are removed</li>
              <li>Interview content is aggregated and anonymized</li>
              <li>Sensitive information is filtered out</li>
              <li>Data is encrypted and securely stored</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">4. Analytics and Tracking</h2>
            <p className="mb-4">
              We use <strong>Microsoft Clarity</strong> and other analytics tools to improve our platform. This includes:
            </p>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>User interaction patterns</li>
              <li>Feature usage analytics</li>
              <li>Performance monitoring</li>
              <li>Error tracking</li>
            </ul>
            <p className="mb-4">
              For more details about Microsoft's data practices, visit their{' '}
              <Link href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                Privacy Statement
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">5. Data Security</h2>
            <p className="mb-4">We implement robust security measures to protect your data:</p>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>End-to-end encryption for video and audio recordings</li>
              <li>Secure data storage and transmission</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">6. Your Privacy Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside mb-6 pl-4">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Export your interview recordings</li>
              <li>Opt-out of AI model training</li>
              <li>Control cookie preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">7. Updates to Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We'll notify you of any significant changes and obtain consent where required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">8. Contact Us</h2>
            <p className="mb-4">
              For privacy-related questions or concerns, please{' '}
              <Link href="/contact" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                contact our support team
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}