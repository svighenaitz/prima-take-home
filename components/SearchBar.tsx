import React from "react";
import { useRouter } from "next/router";

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value: propValue = "", onChange, placeholder = "Search for recipes", autoFocus = false }) => {
  const [value, setValue] = React.useState(propValue);
  const router = useRouter();
  const isExplore = router.pathname === "/explore";
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [autoFocus, value]);

  React.useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (isExplore) {
      onChange?.(e);
    } else {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const input = e.target.value;
      debounceRef.current = setTimeout(() => {
        if (input.length >= 3) {
          router.push(`/explore?query=${encodeURIComponent(input)}`);
        }
      }, 1000);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full rounded-lg bg-[#f3eae7] py-2 px-4 mb-4 focus:outline-none placeholder:text-[#886364]"
      autoComplete="off"
    />
  );
};
