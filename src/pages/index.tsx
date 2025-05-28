import PopularRecipesGrid from "components/PopularRecipesGrid";
import PageHeader from "components/PageHeader";
import { SearchBar } from "components/SearchBar";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Recipes</PageHeader>
        <div className="px-4">
          <SearchBar placeholder="Search for recipes" />
          <h2 className="font-medium text-md mb-6">Popular Recipes</h2>
          <PopularRecipesGrid query="Italian" scrollSnap />
          <h2 className="font-medium text-md mb-6">Quick & Easy</h2>
          <PopularRecipesGrid query="Canadian" />
        </div>        
      </div>
    </>
  );
}
