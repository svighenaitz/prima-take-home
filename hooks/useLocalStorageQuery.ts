import { useQuery } from "@tanstack/react-query";

function useLocalStorageQuery<T>(key: string, url: string, staleTime?: number) {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            return JSON.parse(cached) as T;
          } catch {}
        }
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(json));
      }
      return json;
    },
    staleTime,
    meta: {
      localStorageKey: key,
    },
    // onSuccess is not supported in React Query v5+ options; localStorage is updated in queryFn
  });
}

export default useLocalStorageQuery;
