import React from "react";

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search for recipes" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded-lg bg-[#f3eae7] py-2 px-4 mb-4 focus:outline-none placeholder:text-[#886364]"
  />
);
