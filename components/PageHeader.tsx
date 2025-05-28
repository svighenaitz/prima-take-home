import React from "react";

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, className }) => (
  <header className={`p-4 text-center font-medium text-lg ${className ?? ""}`.trim()}>{children}</header>
);

export default PageHeader;
