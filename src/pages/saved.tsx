import React from 'react';
import PageHeader from "components/PageHeader";

import Head from "next/head";
import RecipeGridList, { type RecipeGridListItem } from 'components/RecipeGridList';



export default function Saved() {
  const gridData: RecipeGridListItem[] = [];
  return (
    <>
      <Head>
        <title>Saved Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Saved</PageHeader>
        <RecipeGridList data={gridData} variant="list" limit={1000} />
      </div>
    </>
  );
}
