"use client";

import { useState } from "react";

import {
	DesignOptionsGrid,
	DesignOptionsGridSkeleton,
} from "@/components/organisms/design-options-grid/design-options-grid";
import { Button } from "@/components/atoms/button/button";
import {
	AddDesignDialog,
	type NewDesignOptionInput,
} from "@/components/organisms/add-design-dialog/add-design-dialog";
import {
	ImportDesignDialog,
	type ImportDesignInput,
} from "@/components/organisms/import-design-dialog/import-design-dialog";
import { useCompareSelection } from "@/components/organisms/site-menu/compare-selection-context";
import { api } from "@/trpc/react";

function HomePageSkeleton() {
	return (
		<div className="space-y-8">
			<section className="border border-slate-200 bg-white p-6 shadow-sm">
				<div className="mb-4 flex justify-end gap-2">
					<Button type="button" variant="default" disabled>
						Import from URL
					</Button>
					<Button type="button" variant="secondary" disabled>
						Add design
					</Button>
				</div>
				<DesignOptionsGridSkeleton count={4} />
			</section>
		</div>
	);
}

export default function HomePage() {
	const utils = api.useUtils();
	const optionsQuery = api.designOption.list.useQuery();
	const { selectedIds, setSelectedIds } = useCompareSelection();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [importError, setImportError] = useState<string | null>(null);
	const options = optionsQuery.data ?? [];
	const optionIds = new Set(options.map((option) => option.id));
	const activeSelectedIds = selectedIds.filter((id) => optionIds.has(id));

	const createDesignMutation = api.designOption.create.useMutation({
		onSuccess: async () => {
			await utils.designOption.list.invalidate();
			setIsDialogOpen(false);
			setSubmitError(null);
		},
		onError: (error) => {
			setSubmitError(error.message);
		},
	});

	const importDesignMutation = api.designOption.import.useMutation({
		onSuccess: async () => {
			await utils.designOption.list.invalidate();
			setIsImportDialogOpen(false);
			setImportError(null);
		},
		onError: (error) => {
			setImportError(error.message);
		},
	});

	const handleCloseDialog = () => {
		if (createDesignMutation.isPending) {
			return;
		}

		setIsDialogOpen(false);
		setSubmitError(null);
	};

	const handleAddNewItem = () => {
		setIsDialogOpen(true);
		setSubmitError(null);
	};

	const handleImportFromUrl = () => {
		setIsImportDialogOpen(true);
		setImportError(null);
	};

	const handleCreateDesign = (input: NewDesignOptionInput) => {
		setSubmitError(null);
		createDesignMutation.mutate(input);
	};

	const handleCloseImportDialog = () => {
		if (importDesignMutation.isPending) {
			return;
		}

		setIsImportDialogOpen(false);
		setImportError(null);
	};

	const handleImportDesignOptions = (input: ImportDesignInput) => {
		setImportError(null);
		importDesignMutation.mutate(input);
	};

	const handleToggleSelect = (optionId: string) => {
		setSelectedIds((current) => {
			if (!optionIds.has(optionId)) {
				return current;
			}

			const filteredCurrent = current.filter((id) => optionIds.has(id));

			if (filteredCurrent.includes(optionId)) {
				return filteredCurrent.filter((id) => id !== optionId);
			}

			if (filteredCurrent.length >= 2) {
				return filteredCurrent;
			}

			return [...filteredCurrent, optionId];
		});
	};

	if (optionsQuery.isLoading) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<HomePageSkeleton />
			</main>
		);
	}

	if (optionsQuery.error) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<section className="rounded-3xl border border-rose-200 bg-rose-50 p-8">
					<h1 className="text-2xl font-semibold text-rose-900">Unable to load options</h1>
					<p className="mt-2 text-sm text-rose-800">{optionsQuery.error.message}</p>
				</section>
			</main>
		);
	}

	return (
		<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
			<div className="space-y-8">
				<section className="border border-slate-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex justify-end gap-2">
						<Button type="button" variant="default" onClick={handleImportFromUrl}>
							Import from URL
						</Button>
						<Button type="button" variant="secondary" onClick={handleAddNewItem}>
							Add design
						</Button>
					</div>
					<DesignOptionsGrid
						options={options}
						selectedIds={activeSelectedIds}
						selectionEnabled
						selectionLimitReached={activeSelectedIds.length >= 2}
						onToggleSelect={handleToggleSelect}
						emptyState={
							<div className="mt-6 border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600">
								No design options yet.
							</div>
						}
					/>
				</section>
			</div>

			<AddDesignDialog
				key={`add-dialog-${isDialogOpen ? "open" : "closed"}`}
				isOpen={isDialogOpen}
				isSubmitting={createDesignMutation.isPending}
				submitError={submitError}
				onClose={handleCloseDialog}
				onSubmit={handleCreateDesign}
			/>
			<ImportDesignDialog
				key={`import-dialog-${isImportDialogOpen ? "open" : "closed"}`}
				isOpen={isImportDialogOpen}
				isSubmitting={importDesignMutation.isPending}
				submitError={importError}
				onClose={handleCloseImportDialog}
				onSubmit={handleImportDesignOptions}
			/>
		</main>
	);
}
