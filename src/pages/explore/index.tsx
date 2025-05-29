import React from 'react';

import Head from "next/head";
import PageHeader from "components/PageHeader";
import { SearchBar } from "components/SearchBar";
import { RecipeList } from "components/RecipeList";

import { useSyncedSearchQuery } from "hooks/useSyncedSearchQuery";

export default function Explore() {
  const [input, setInput, debouncedInput] = useSyncedSearchQuery("query", 1000);
  const pending = input !== debouncedInput;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Explore</PageHeader>
        <div className="px-4">
          <SearchBar value={input} onChange={handleSearchChange} placeholder="Search for recipes" autoFocus={!!input} />
          <RecipeList query={debouncedInput} forceLoading={pending} />
        </div>
      </div>
    </>
  );
}

