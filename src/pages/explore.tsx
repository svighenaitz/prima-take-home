import React from 'react';

import Head from "next/head";
import PageHeader from "components/PageHeader";
import { SearchBar } from "components/SearchBar";
import { RecipeList } from "components/RecipeList";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Explore</PageHeader>
        <div className="px-4">
          <SearchBar placeholder="Search for recipes" />
          <RecipeList  />
        </div>
      </div>
    </>
  );
}

