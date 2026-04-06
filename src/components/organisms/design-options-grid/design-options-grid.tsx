import type { ReactNode } from "react";

import {
	DesignOptionCard,
	DesignOptionCardSkeleton,
	type DesignOptionCardData,
} from "@/components/molecules/design-option-card/design-option-card";

export type DesignOptionsGridProps = {
	options: DesignOptionCardData[];
	selectedIds?: string[];
	selectionEnabled?: boolean;
	selectionLimitReached?: boolean;
	onToggleSelect?: (optionId: string) => void;
	emptyState?: ReactNode;
	className?: string;
};

export function DesignOptionsGrid({
	options,
	selectedIds = [],
	selectionEnabled = false,
	selectionLimitReached = false,
	onToggleSelect,
	emptyState,
	className,
}: DesignOptionsGridProps) {
	if (options.length === 0) {
		return <>{emptyState ?? null}</>;
	}

	const selectedSet = new Set(selectedIds);

	return (
		<div className={className ?? "mt-6 grid gap-2 md:grid-cols-2 xl:grid-cols-4"}>
			{options.map((option) => (
				<DesignOptionCard
					key={option.id}
					option={option}
					isSelected={selectedSet.has(option.id)}
					selectionEnabled={selectionEnabled}
					selectionDisabled={selectionLimitReached}
					onToggleSelect={onToggleSelect}
				/>
			))}
		</div>
	);
}

export function DesignOptionsGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="mt-6 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
			{Array.from({ length: count }).map((_, index) => (
				<DesignOptionCardSkeleton key={index} />
			))}
		</div>
	);
}
