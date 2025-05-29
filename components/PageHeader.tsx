import React from "react";
import { useRouter } from "next/router";

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
  showBack?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, className, showBack = false }) => {
  const router = useRouter();
  return (
    <header className={`relative flex items-center p-4 font-medium text-lg ${className ?? ""}`.trim()}>
      {showBack && (
        <button
          aria-label="Go back"
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="button"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className="flex-1 text-center">{children}</div>
    </header>
  );
};

export default PageHeader;
