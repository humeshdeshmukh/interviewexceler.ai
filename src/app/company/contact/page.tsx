"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { submitContactForm } from "./actions";
import { ContactFormData } from "./actions";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";

const BackgroundGradient = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
    </motion.div>
  );
};

const GridPattern = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
    </motion.div>
  );
};

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "support@InterviewExceler.Ai",
      href: "mailto:support@InterviewExceler.Ai",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nagpur, Maharashtra, India",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 (XXX) XXX-XXXX",
      href: "tel:+91XXXXXXXXXX",
    },
    {
      icon: MessageSquare,
      title: "Social",
      value: "@InterviewExceler.Ai",
      href: "https://twitter.com/InterviewExceler",
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
            className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center transition-colors"
          >
            <div className="flex justify-center text-[#fcba28] mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
            {method.href ? (
              <a
                href={method.href}
                className="text-white/60 hover:text-[#fcba28] transition-colors"
              >
                {method.value}
              </a>
            ) : (
              <p className="text-white/60">{method.value}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState<{
    success?: boolean;
    message?: string;
    errors?: any;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await submitContactForm(data);
    setFormState(result);
    setIsSubmitting(false);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 text-white placeholder-white/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 text-white placeholder-white/40"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 text-white placeholder-white/40"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 text-white placeholder-white/40 resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>

      {formState.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            formState.success
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {formState.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-[#fcba28] text-black rounded-lg font-semibold hover:bg-[#fcba28]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundGradient />
      <GridPattern />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Have questions about InterviewExceler.Ai? We're here to help. Reach out to our team
              and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Info Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <ContactInfo />
        </MaxWidthWrapper>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-8 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
