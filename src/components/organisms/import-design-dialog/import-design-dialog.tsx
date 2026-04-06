"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/atoms/button/button";

export const DEFAULT_IMPORT_ENDPOINT = "https://dummyjson.com/products/category/home-decoration";

export type ImportDesignInput = {
	sourceUrl: string;
};

type ImportDesignDialogProps = {
	isOpen: boolean;
	isSubmitting: boolean;
	submitError: string | null;
	onClose: () => void;
	onSubmit: (input: ImportDesignInput) => void;
};

export function ImportDesignDialog({
	isOpen,
	isSubmitting,
	submitError,
	onClose,
	onSubmit,
}: ImportDesignDialogProps) {
	const [sourceUrl, setSourceUrl] = useState(DEFAULT_IMPORT_ENDPOINT);
	const [validationError, setValidationError] = useState<string | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValidationError(null);

		const trimmedUrl = sourceUrl.trim();

		try {
			new URL(trimmedUrl);
		} catch {
			setValidationError("Please enter a valid public URL.");
			return;
		}

		onSubmit({
			sourceUrl: trimmedUrl
		});
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6">
			<div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
				<div className="mb-4">
					<h2 className="text-xl font-semibold text-slate-900">Import options from URL</h2>
					<p className="mt-1 text-sm text-slate-600">
						Provide a public JSON endpoint. We import all available records and map them to our
						design option model.
					</p>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<label className="grid gap-1 text-sm">
						<span className="font-medium text-slate-700">Public endpoint URL</span>
						<input
							required
							type="url"
							value={sourceUrl}
							onChange={(event) => setSourceUrl(event.target.value)}
							className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
						/>
					</label>

					{validationError ? <p className="text-sm text-rose-700">{validationError}</p> : null}
					{!validationError && submitError ? <p className="text-sm text-rose-700">{submitError}</p> : null}

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="default" onClick={onClose} disabled={isSubmitting}>
							Cancel
						</Button>
						<Button type="submit" variant="secondary" disabled={isSubmitting}>
							{isSubmitting ? "Importing..." : "Import options"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
