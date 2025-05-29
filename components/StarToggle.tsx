import React, { useState } from "react";

interface StarToggleProps {
  initialFilled?: boolean;
  onToggle?: (filled: boolean) => void;
  className?: string;
}

const StarToggle: React.FC<StarToggleProps> = ({ initialFilled = false, onToggle, className }) => {
  const [filled, setFilled] = useState(initialFilled);

  const handleClick = () => {
    setFilled((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  };

  return (
    <button
      aria-label={filled ? "Unsave" : "Save"}
      type="button"
      onClick={handleClick}
      className={`focus:outline-none w-8 h-8 flex items-center justify-center ${className ?? ""}`}
    >
      {filled ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default StarToggle;
