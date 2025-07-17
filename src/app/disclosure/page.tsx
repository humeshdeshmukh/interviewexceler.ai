import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InterviewExceler.Ai - Disclosures",
  description: "Important disclosures about our AI interview coaching platform, data usage, and privacy practices."
}

export default function Disclosures() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
                    Disclosures
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">AI Interview Coaching Disclosure</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                InterviewExceler.Ai uses advanced artificial intelligence to provide interview coaching and feedback.
                                While our AI technology is designed to provide helpful guidance, please note:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Our AI feedback is for practice and guidance purposes only</li>
                                <li>The AI's responses are generated based on training data and may not perfectly match real-world scenarios</li>
                                <li>Users should use their judgment when applying AI suggestions</li>
                                <li>We continuously improve our AI models based on user interactions</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">Data Collection & Usage</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                To provide our AI interview coaching services, we collect and process the following types of data:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Interview responses and transcripts</li>
                                <li>Video recordings (when enabled)</li>
                                <li>Practice session analytics</li>
                                <li>User preferences and settings</li>
                                <li>Performance metrics and feedback</li>
                            </ul>
                            <p>
                                We use this data to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Provide personalized interview feedback</li>
                                <li>Improve our AI coaching algorithms</li>
                                <li>Enhance user experience</li>
                                <li>Generate anonymous usage statistics</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">Analytics & Tracking</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                We use <strong>Microsoft Clarity</strong> and other analytics tools to understand how users interact
                                with our platform. This includes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Usage patterns and behavioral metrics</li>
                                <li>Feature engagement statistics</li>
                                <li>Performance monitoring</li>
                                <li>Error tracking</li>
                            </ul>
                            <p>
                                For more information about our data practices, please review our{' '}
                                <Link href="/privacy-policy" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-white">How is my interview data used?</h3>
                                <p className="text-gray-300">
                                    Your interview responses and recordings are used to provide immediate feedback and may be used
                                    in an anonymized form to improve our AI models. Personal identifiers are removed before any
                                    data is used for model training.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-white">Can I delete my practice session data?</h3>
                                <p className="text-gray-300">
                                    Yes, you can delete your practice session data at any time from your account settings.
                                    However, anonymized data that has been used for AI model training cannot be retroactively
                                    removed from the model.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-white">How do you protect my privacy?</h3>
                                <p className="text-gray-300">
                                    We employ industry-standard security measures to protect your data. Video recordings and
                                    interview responses are encrypted, and access is strictly controlled. We never share your
                                    personal data with third parties without your explicit consent.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-[#fcba28]">Contact Us</h2>
                        <p className="text-gray-300">
                            If you have any questions about these disclosures or our data practices, please{' '}
                            <Link href="/contact" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                                contact our support team
                            </Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}