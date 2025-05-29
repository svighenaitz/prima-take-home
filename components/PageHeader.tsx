import React from "react";
import { useRouter } from "next/router";

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  children, 
  className, 
  showBack = false, 
  rightElement,
  headingLevel = 'h1'
}) => {
  const router = useRouter();
  
  // Create a component to render the correct heading level
  const Heading = ({ children }: { children: React.ReactNode }) => {
    switch (headingLevel) {
      case 'h1': return <h1 className="m-0 text-lg font-medium">{children}</h1>;
      case 'h2': return <h2 className="m-0 text-lg font-medium">{children}</h2>;
      case 'h3': return <h3 className="m-0 text-lg font-medium">{children}</h3>;
      default: return <h1 className="m-0 text-lg font-medium">{children}</h1>;
    }
  };
  
  return (
    <header 
      className={`relative flex items-center p-4 font-medium text-lg ${className ?? ""}`.trim()}
      role="banner"
    >
      {/* Left: Back Arrow */}
      {showBack && (
        <button
          aria-label="Go back"
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="button"
        >
          <svg 
            width="24" 
            height="24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path 
              d="M15 19l-7-7 7-7" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      
      {/* Center: Title */}
      <div className="flex-1 text-center px-12">
        <Heading>{children}</Heading>
      </div>
      
      {/* Right: Custom Element */}
      {rightElement && (
        <div 
          className="absolute right-4 flex items-center justify-center"
          aria-live="polite"
        >
          {rightElement}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
