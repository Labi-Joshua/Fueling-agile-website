"use client";

// Mounts a single TanStack Query client for the whole app so any client component
// can call useQuery/useMutation. Lives in its own client component (rather than
// directly in app/layout.tsx) because QueryClientProvider needs client-side React
// context, while layout.tsx itself stays a server component.
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Created once per browser session via useState's lazy initializer, so the
  // QueryClient (and its cache) survives re-renders instead of being rebuilt each time.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
