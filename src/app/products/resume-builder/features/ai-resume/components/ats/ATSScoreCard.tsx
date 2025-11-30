"use client";

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  improvements: string[];
}

export const ATSScoreCard = ({ score, improvements }: ATSScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">ATS Score</h3>
          <p className="text-sm text-muted-foreground">
            Based on AI analysis of your resume
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getScoreIcon(score)}
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Suggested Improvements</h4>
        <ul className="space-y-2">
          {improvements.map((improvement, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
