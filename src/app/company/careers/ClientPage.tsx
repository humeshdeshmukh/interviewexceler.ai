"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { departments, jobPostings } from "./data/jobs";
import { ChevronDown } from "lucide-react";

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

const JobCard = ({ job }: { job: typeof jobPostings[0] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = job.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="cursor-pointer group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-5 h-5 text-[#fcba28]" />
                            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        </div>
                        <div className="space-y-2 mb-4">
                            <p className="text-white/60">{job.description}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                    {job.department}
                                </span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                    {job.location}
                                </span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                    {job.type}
                                </span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                    {job.experience}
                                </span>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2"
                    >
                        <ChevronDown className="w-5 h-5 text-white/60" />
                    </motion.div>
                </div>

                <motion.div
                    animate={{ height: isExpanded ? "auto" : 0 }}
                    initial={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pt-4 space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
                            <ul className="list-disc list-inside space-y-1 text-white/60">
                                {job.responsibilities.map((resp, index) => (
                                    <li key={index}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Requirements</h4>
                            <ul className="list-disc list-inside space-y-1 text-white/60">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Benefits</h4>
                            <ul className="list-disc list-inside space-y-1 text-white/60">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="pt-4">
                            <a
                                href={`mailto:careers@InterviewExceler.Ai?subject=Application for ${job.title} - ${job.id}`}
                                className="inline-block px-6 py-3 bg-[#fcba28] text-black rounded-lg font-semibold hover:bg-[#fcba28]/90 transition-colors"
                            >
                                Apply Now
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function Careers() {
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    const filteredJobs = selectedDepartment
        ? jobPostings.filter((job) => job.department === selectedDepartment)
        : jobPostings;

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
                            Join Our Mission
                        </h1>
                        <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
                            Help us revolutionize technical interview preparation and empower developers worldwide
                            to achieve their dream careers.
                        </p>
                    </motion.div>
                </MaxWidthWrapper>
            </section>

            {/* Departments Section */}
            <section className="relative py-16">
                <MaxWidthWrapper>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {departments.map((dept) => {
                            const Icon = dept.icon;
                            return (
                                <motion.button
                                    key={dept.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    viewport={{ once: true }}
                                    onClick={() =>
                                        setSelectedDepartment(
                                            selectedDepartment === dept.name ? null : dept.name
                                        )
                                    }
                                    className={`group p-4 rounded-xl transition-colors ${selectedDepartment === dept.name
                                        ? "bg-[#fcba28] text-black"
                                        : "hover:bg-white/[0.1] bg-black/20 text-white"
                                        }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <Icon
                                            className={`w-6 h-6 mb-2 ${selectedDepartment === dept.name
                                                ? "text-black"
                                                : "text-[#fcba28]"
                                                }`}
                                        />
                                        <h3 className="font-semibold mb-1">{dept.name}</h3>
                                        <p
                                            className={`text-sm ${selectedDepartment === dept.name
                                                ? "text-black/80"
                                                : "text-white/60"
                                                }`}
                                        >
                                            {dept.description}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Job Listings Section */}
            <section className="relative py-16">
                <MaxWidthWrapper>
                    <div className="space-y-6">
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                    {filteredJobs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-white/60">
                                No open positions in this department at the moment.
                                <br />
                                Check back later or explore other departments!
                            </p>
                        </motion.div>
                    )}
                </MaxWidthWrapper>
            </section>

            {/* Contact Section */}
            <section className="relative py-16">
                <MaxWidthWrapper>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Don't see a perfect fit?</h2>
                        <p className="text-lg text-white/60 mb-8">
                            We're always looking for talented individuals. Send your resume to{" "}
                            <a
                                href="mailto:careers@InterviewExceler.Ai"
                                className="text-[#fcba28] hover:underline"
                            >
                                careers@InterviewExceler.Ai
                            </a>
                        </p>
                    </motion.div>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}
