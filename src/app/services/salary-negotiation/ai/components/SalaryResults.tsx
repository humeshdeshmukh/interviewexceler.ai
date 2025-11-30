'use client';

import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, Target, Lightbulb, Award, CheckCircle, ArrowRight } from 'lucide-react';

interface SalaryResultsProps {
  result: {
    salaryRange: {
      min: number;
      average: number;
      max: number;
    };
    currency: string;
    keyFactors: string[];
    marketInsights: string[];
    negotiationTips: string[];
    benefitsAnalysis: string[];
  };
}

export const SalaryResults = ({ result }: SalaryResultsProps) => {
  const { salaryRange, currency, keyFactors, marketInsights, negotiationTips, benefitsAnalysis } = result;

  const formatCurrency = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    } else if (currency === 'GBP') {
      return `£${amount.toLocaleString('en-GB')}`;
    } else if (currency === 'EUR') {
      return `€${amount.toLocaleString('en-EU')}`;
    } else {
      return `$${amount.toLocaleString('en-US')}`;
    }
  };

  const salaryPercentage = ((salaryRange.average - salaryRange.min) / (salaryRange.max - salaryRange.min)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fcba28]/20 mb-4">
          <TrendingUp className="w-8 h-8 text-[#fcba28]" />
        </div>
        <h2 className="text-3xl font-bold text-[#fcba28] mb-2">Your Salary Insights</h2>
        <p className="text-[#f9f4da]/70">AI-powered analysis based on your profile</p>
      </div>

      {/* Salary Range Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Minimum */}
        <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-all">
          <div className="text-[#f9f4da]/60 text-sm mb-2">Minimum</div>
          <div className="text-2xl font-bold text-[#f9f4da] mb-1">{formatCurrency(salaryRange.min)}</div>
          <div className="text-xs text-[#f9f4da]/50">Entry-level range</div>
        </Card>

        {/* Average */}
        <Card className="p-6 bg-gradient-to-br from-[#fcba28]/20 to-[#e9aa22]/10 border-[#fcba28] border-2 shadow-[0_0_20px_rgba(252,186,40,0.3)] relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Award className="w-5 h-5 text-[#fcba28]" />
          </div>
          <div className="text-[#fcba28] text-sm font-medium mb-2">Expected Salary</div>
          <div className="text-3xl font-bold text-[#fcba28] mb-1">{formatCurrency(salaryRange.average)}</div>
          <div className="text-xs text-[#fcba28]/80">Market average</div>
        </Card>

        {/* Maximum */}
        <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-all">
          <div className="text-[#f9f4da]/60 text-sm mb-2">Maximum</div>
          <div className="text-2xl font-bold text-[#f9f4da] mb-1">{formatCurrency(salaryRange.max)}</div>
          <div className="text-xs text-[#f9f4da]/50">Top performer range</div>
        </Card>
      </div>

      {/* Visual Salary Range */}
      <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-[#f9f4da]">Salary Range Visualization</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-[#f9f4da]/70">
            <span>{formatCurrency(salaryRange.min)}</span>
            <span>{formatCurrency(salaryRange.max)}</span>
          </div>
          <div className="relative h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-[#fcba28]/30 to-[#fcba28] rounded-full"
              style={{ width: '100%' }}
            />
            <div
              className="absolute h-6 w-6 bg-[#fcba28] rounded-full border-4 border-[#1a1a1a] top-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(252,186,40,0.6)]"
              style={{ left: `${salaryPercentage}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
          <div className="text-center">
            <span className="text-sm text-[#fcba28] font-medium">Your Expected Salary: {formatCurrency(salaryRange.average)}</span>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Factors */}
        <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-[#fcba28]" />
            <h3 className="text-lg font-semibold text-[#f9f4da]">Key Factors</h3>
          </div>
          <ul className="space-y-3">
            {keyFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-3 text-[#f9f4da]/80 text-sm">
                <ArrowRight className="w-4 h-4 text-[#fcba28] mt-0.5 flex-shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Market Insights */}
        <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#fcba28]" />
            <h3 className="text-lg font-semibold text-[#f9f4da]">Market Insights</h3>
          </div>
          <ul className="space-y-3">
            {marketInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3 text-[#f9f4da]/80 text-sm">
                <ArrowRight className="w-4 h-4 text-[#fcba28] mt-0.5 flex-shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Negotiation Tips */}
      <Card className="p-6 bg-gradient-to-br from-[#fcba28]/10 to-[#e9aa22]/5 border-[#fcba28]/30">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-[#fcba28]">Negotiation Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {negotiationTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-[#272727]/50 rounded-lg border border-[#fcba28]/20">
              <div className="w-6 h-6 rounded-full bg-[#fcba28] text-[#1a1a1a] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-[#f9f4da]/90 text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Benefits Analysis */}
      <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#fcba28]/20">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-5 h-5 text-[#fcba28]" />
          <h3 className="text-lg font-semibold text-[#f9f4da]">Benefits & Compensation</h3>
        </div>
        <div className="space-y-3">
          {benefitsAnalysis.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-[#1a1a1a]/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#fcba28] mt-0.5 flex-shrink-0" />
              <span className="text-[#f9f4da]/80 text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center pt-6">
        <p className="text-[#f9f4da]/60 text-sm mb-4">
          💡 Use these insights to negotiate your best offer
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-br from-[#fcba28] to-[#e9aa22] text-[#1a1a1a] font-semibold rounded-xl hover:shadow-[0_6px_20px_rgba(252,186,40,0.5)] hover:-translate-y-0.5 transition-all"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};
