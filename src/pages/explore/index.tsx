import React, { useRef } from 'react';

import Head from "next/head";
import PageHeader from "components/PageHeader";
import { SearchBar } from "components/SearchBar";
import { RecipeList } from "components/RecipeList";

import { useSyncedSearchQuery } from "hooks/useSyncedSearchQuery";

export default function Explore() {
  const [input, setInput, debouncedInput] = useSyncedSearchQuery("query", 1000);
  const pending = input !== debouncedInput;
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Explore</title>
        <meta name="description" content="Explore recipes from around the world" />
      </Head>
      <main className="min-h-screen flex flex-col bg-[#faf7f6] pb-16" id="main-content">
        <PageHeader>Explore</PageHeader>
        <section className="px-4" aria-label="Recipe search section">
          <div ref={searchRef}>
            <SearchBar 
              value={input} 
              onChange={handleSearchChange} 
              placeholder="Search for recipes" 
            />
          </div>
          <RecipeList 
            query={debouncedInput} 
            forceLoading={pending} 
            aria-live="polite"
          />
        </section>
      </main>
    </>
  );
}

