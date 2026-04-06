"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/atoms/button/button";
import { useCompareSelection } from "@/components/organisms/site-menu/compare-selection-context";

export function SiteMenu() {
	const router = useRouter();
	const pathname = usePathname();
	const { selectedIds, setSelectedIds } = useCompareSelection();
	const canCompare = pathname === "/" && selectedIds.length === 2;
	const canClearSelection = selectedIds.length > 0;

	const handleCompare = () => {
		if (!canCompare) {
			return;
		}

		router.push(`/design-options/compare?id1=${selectedIds[0]}&id2=${selectedIds[1]}`);
	};

	const handleClearSelection = () => {
		if (!canClearSelection) {
			return;
		}

		setSelectedIds([]);
	};

	return (
		<header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-slate-100">
			<div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
				<Button asChild variant="secondary" size="sm" className="w-fit justify-self-start">
					<Link href="/">Overview</Link>
				</Button>
				<p className="text-center text-lg font-semibold tracking-wide sm:text-xl">StudioLens</p>
				<div className="flex justify-self-end gap-2">
					<Button type="button" variant="secondary" size="sm" onClick={handleClearSelection} disabled={!canClearSelection}>
						Clear selection
					</Button>
					<Button type="button" variant="default" size="sm" onClick={handleCompare} disabled={!canCompare}>
						Compare ({selectedIds.length}/2)
					</Button>
				</div>
			</div>
		</header>
	);
}
