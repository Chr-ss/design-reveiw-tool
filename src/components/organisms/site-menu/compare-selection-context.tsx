"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type CompareSelectionContextValue = {
	selectedIds: string[];
	setSelectedIds: Dispatch<SetStateAction<string[]>>;
};

const CompareSelectionContext = createContext<CompareSelectionContextValue>({
	selectedIds: [],
	setSelectedIds: () => undefined,
});

export function CompareSelectionProvider({ children }: { children: ReactNode }) {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const value = useMemo(
		() => ({
			selectedIds,
			setSelectedIds,
		}),
		[selectedIds],
	);

	return <CompareSelectionContext.Provider value={value}>{children}</CompareSelectionContext.Provider>;
}

export function useCompareSelection() {
	return useContext(CompareSelectionContext);
}
