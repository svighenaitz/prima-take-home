import React, { useState } from "react";

interface StarToggleProps {
  filled?: boolean;
  initialFilled?: boolean;
  onToggle?: (filled: boolean) => void;
  className?: string;
}

const StarToggle: React.FC<StarToggleProps> = ({ filled, initialFilled = false, onToggle, className }) => {
  const [internalFilled, setInternalFilled] = useState(initialFilled);
  const isFilled = filled !== undefined ? filled : internalFilled;

  const handleClick = () => {
    if (filled === undefined) {
      setInternalFilled((prev) => {
        const next = !prev;
        onToggle?.(next);
        return next;
      });
    } else {
      onToggle?.(!filled);
    }
  };

  return (
    <button
      aria-label={isFilled ? "Unsave" : "Save"}
      type="button"
      onClick={handleClick}
      className={`focus:outline-none w-8 h-8 flex items-center justify-center ${className ?? ""}`}
    >
      {isFilled ? (
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
