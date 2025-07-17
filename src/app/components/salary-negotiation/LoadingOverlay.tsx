"use client";

import { InlineSpinner } from '@/app/components/shared/InlineSpinner';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl flex items-center gap-4">
        <InlineSpinner />
        <span className="text-white">Submitting your request...</span>
      </div>
    </div>
  );
}
