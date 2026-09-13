"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  linkText?: string;
  linkHref?: string;
}

export default function AnnouncementBar({
  text = "Pan India Delivery • Easy Shopping for Little Ones",
  linkText = "Shop New Arrivals",
  linkHref = "/girls"
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#242220] text-[#f4dcda] text-[11px] font-medium tracking-wide py-2 px-4 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center pr-6 sm:pr-0">
        <span>{text}</span>
        {linkText && (
          <Link
            href={linkHref}
            className="underline underline-offset-2 hover:text-white transition-colors font-semibold ml-1 hidden sm:inline"
          >
            {linkText} &rarr;
          </Link>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}
