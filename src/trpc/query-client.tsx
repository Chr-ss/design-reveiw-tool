"use client";

import { useState, type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import { api } from "@/trpc/react";

export function TRPCReactProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60_000,
					},
				},
			}),
	);

	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: () =>
						process.env.NODE_ENV === "development" && typeof window !== "undefined",
				}),
				httpBatchLink({
					url: "/api/trpc",
					transformer: superjson,
				}),
			],
		}),
	);

	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</api.Provider>
	);
}
