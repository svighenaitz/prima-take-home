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
    const input = e.target.value;
    if (!isExplore && input.length >= 3) {
      // Use void operator to explicitly ignore the promise
      void router.push(`/explore?query=${encodeURIComponent(input)}`);
      return;
    }
    if (isExplore) {
      onChange?.(e);
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
