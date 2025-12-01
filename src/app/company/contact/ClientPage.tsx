"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Mail, MapPin, MessageSquare, HelpCircle, Clock, Shield } from "lucide-react";

const ContactInfo = () => {
    const contactMethods = [
        {
            icon: Mail,
            title: "Email Us",
            value: "interviewmastercontact@gmail.com",
            href: "mailto:interviewmastercontact@gmail.com",
        },
        {
            icon: MapPin,
            title: "Location",
            value: "Nagpur, Maharashtra, India",
        },
        {
            icon: Clock,
            title: "Response Time",
            value: "Within 24 hours",
        },
        {
            icon: Shield,
            title: "Privacy",
            value: "100% Confidential",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                    <motion.div
                        key={method.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-[#fcba28]/30 rounded-2xl p-8 text-center transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        <div className="relative z-10">
                            <div className="flex justify-center text-[#fcba28] mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="p-3 bg-white/5 rounded-xl">
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-white/90 mb-2">{method.title}</h3>
                            {method.href ? (
                                <a
                                    href={method.href}
                                    className="text-white/60 hover:text-[#fcba28] transition-colors text-sm"
                                >
                                    {method.value}
                                </a>
                            ) : (
                                <p className="text-white/60 text-sm">{method.value}</p>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default function Contact() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 z-10">
                <MaxWidthWrapper>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-full mb-6"
                        >
                            <MessageSquare className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-sm font-medium text-[#fcba28]">We're Here to Help</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed mb-8">
                            Have questions about InterviewExceler.AI? Need help with your account? We're here to support your journey to interview success.
                        </p>

                        {/* Email Button */}
                        <motion.a
                            href="mailto:interviewmastercontact@gmail.com?subject=Inquiry about InterviewExceler.AI"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fcba28] to-[#e9aa22] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#fcba28]/50"
                        >
                            <Mail className="w-6 h-6" />
                            Email Us Directly
                        </motion.a>
                    </motion.div>
                </MaxWidthWrapper>
            </section>

            {/* Contact Info Section */}
            <section className="relative py-16 z-10">
                <MaxWidthWrapper>
                    <ContactInfo />
                </MaxWidthWrapper>
            </section>

            {/* FAQ Section */}
            <section className="relative py-16 pb-24 z-10">
                <MaxWidthWrapper>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-12">
                            <HelpCircle className="w-8 h-8 text-[#fcba28]" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Quick Answers</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    q: "How quickly will I get a response?",
                                    a: "We aim to respond to all inquiries within 24 hours during business days."
                                },
                                {
                                    q: "Can I schedule a demo?",
                                    a: "Absolutely! Mention your preferred time in the email, and we'll arrange a personalized demo."
                                },
                                {
                                    q: "Do you offer enterprise plans?",
                                    a: "Yes! We provide custom enterprise solutions for universities and corporations. Contact us for more details."
                                },
                                {
                                    q: "Is my data secure?",
                                    a: "100%. We use industry-standard encryption and never share your personal information with third parties."
                                }
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-white/60 leading-relaxed">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}
