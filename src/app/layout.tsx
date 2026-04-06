import "./globals.css";

import type { ReactNode } from "react";

import { CompareSelectionProvider } from "@/components/organisms/site-menu/compare-selection-context";
import { SiteMenu } from "@/components/organisms/site-menu/site-menu";
import { TRPCReactProvider } from "@/trpc/query-client";

export const metadata = {
	title: "StudioLens",
	description: "Simple T3 stack prototype in Docker.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<TRPCReactProvider>
					<CompareSelectionProvider>
						<SiteMenu />
						{children}
					</CompareSelectionProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
