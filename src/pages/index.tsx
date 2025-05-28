import PopularRecipesGrid from "components/PopularRecipesGrid";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <header className="p-4 text-center font-medium text-lg">Recipes</header>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search for recipes"
            className="w-full rounded-lg bg-[#f3eae7] py-2 px-4 mb-8 focus:outline-none placeholder:text-[#886364]"
          />
          <h2 className="font-medium text-md mb-6">Popular Recipes</h2>
          <PopularRecipesGrid query="Italian" scrollSnap />
          <h2 className="font-medium text-md mb-6">Quick & Easy</h2>
          <PopularRecipesGrid query="Canadian" />
        </div>        
      </div>
    </>
  );
}
