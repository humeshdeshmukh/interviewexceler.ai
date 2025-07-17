"use client";

export function InlineSpinner() {
  return (
    <div className="inline-block">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#fcba28] rounded-full animate-spin" />
    </div>
  );
}
