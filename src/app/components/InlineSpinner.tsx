"use client";

interface InlineSpinnerProps {
  className?: string;
}

export const InlineSpinner = ({ className = "" }: InlineSpinnerProps) => {
  return (
    <div className={`animate-spin ${className}`}>
      <div className="w-full h-full border-2 border-current border-t-transparent rounded-full" />
    </div>
  );
};
