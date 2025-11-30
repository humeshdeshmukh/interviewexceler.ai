"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, FileText, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SavedResume {
    id: string;
    content: any;
    ats_score: number;
    created_at: string;
    updated_at?: string;
}

export default function ResumeDashboard() {
    const router = useRouter();
    const [resumes, setResumes] = useState<SavedResume[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await fetch("/api/resumes/list");
            if (response.ok) {
                const data = await response.json();
                setResumes(data);
            } else {
                toast.error("Failed to fetch resumes");
            }
        } catch (error) {
            console.error("Error fetching resumes:", error);
            toast.error("Error fetching resumes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        router.push("/products/resume-builder/features/ai-resume");
    };

    const handleEdit = (id: string) => {
        // In a real app, we would pass the ID to the builder to load it.
        // Since our builder currently loads from context, we might need to pass it via query param
        // and have the builder page load it.
        router.push(`/products/resume-builder/features/ai-resume?id=${id}`);
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
                        <p className="text-muted-foreground">Manage and edit your AI-generated resumes</p>
                    </div>
                    <Button onClick={handleCreateNew} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create New Resume
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No resumes found</h3>
                        <p className="text-muted-foreground mb-6">Get started by creating your first AI-powered resume</p>
                        <Button onClick={handleCreateNew}>Create Resume</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume, index) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-card hover:bg-accent/5 border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    {resume.ats_score && (
                                        <div className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                                            ATS Score: {resume.ats_score}
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {resume.content.personalInfo?.fullName || "Untitled Resume"}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {new Date(resume.updated_at || resume.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <Button
                                    onClick={() => handleEdit(resume.id)}
                                    variant="outline"
                                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                                >
                                    Edit Resume
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
