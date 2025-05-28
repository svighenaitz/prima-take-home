import React from 'react';

import Head from "next/head";
import PageHeader from "components/PageHeader";
import { SearchBar } from "components/SearchBar";
import { RecipeList } from "components/RecipeList";

import { useRouter } from "next/router";

export default function Explore() {
  const router = useRouter();
  const queryValue = typeof router.query.query === "string" ? router.query.query : "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    router.replace({
      pathname: "/explore",
      query: val.length > 0 ? { query: val } : {},
    }, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Explore</PageHeader>
        <div className="px-4">
          <SearchBar value={queryValue} onChange={handleSearchChange} placeholder="Search for recipes" autoFocus={!!queryValue} />
          <RecipeList />
        </div>
      </div>
    </>
  );
}

