import { useRouter } from "next/router";
import React from "react";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

/**
 * Keeps a controlled input value in sync with the URL query param (?query=).
 * Returns: [inputValue, setInputValue, debouncedValue]
 */
export function useSyncedSearchQuery(paramName: string = "query", debounceMs: number = 600) {
  const router = useRouter();
  const urlQuery = typeof router.query[paramName] === "string" ? router.query[paramName] : "";
  
  // Initialize with an empty string, but update when router.query is available
  const [input, setInput] = React.useState("");
  
  // Track whether we've initialized from the URL
  const initializedRef = React.useRef(false);

  // Keep input in sync with URL query param (important for SSR/hydration)
  React.useEffect(() => {
    // Only update if we have a non-empty urlQuery or haven't initialized yet
    if (urlQuery || !initializedRef.current) {
      setInput(urlQuery);
      initializedRef.current = true;
    }
  }, [urlQuery]);

  // Debounce the input value
  const debouncedInput = useDebouncedValue(input, debounceMs);

  // Update the URL only when the debounced value changes
  React.useEffect(() => {
    // Skip the first update if it would clear an existing URL parameter
    if (!router.isReady) return;
    
    // Only update URL if the debounced input is different from the URL query
    if (debouncedInput !== urlQuery) {
      router.replace({
        pathname: router.pathname,
        query: debouncedInput.length > 0 ? { ...router.query, [paramName]: debouncedInput } : { ...router.query, [paramName]: undefined },
      }, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput, urlQuery, router.isReady]);

  return [input, setInput, debouncedInput] as const;
}
