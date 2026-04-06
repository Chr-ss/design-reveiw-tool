"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/atoms/button/button";

export type NewDesignOptionInput = {
	name: string;
	description: string;
	imageUrl: string | null;
	area: number;
	cost: number;
	embodiedCarbon: number;
	daylightScore: number;
	tags: string;
	notes: string | null;
};

type DesignFormState = {
	name: string;
	description: string;
	imageUrl: string;
	area: string;
	cost: string;
	embodiedCarbon: string;
	daylightScore: string;
	tags: string;
	notes: string;
};

const initialFormState: DesignFormState = {
	name: "",
	description: "",
	imageUrl: "",
	area: "",
	cost: "",
	embodiedCarbon: "",
	daylightScore: "",
	tags: "",
	notes: "",
};

type AddDesignDialogProps = {
	isOpen: boolean;
	isSubmitting: boolean;
	submitError: string | null;
	onClose: () => void;
	onSubmit: (input: NewDesignOptionInput) => void;
};

export function AddDesignDialog({
	isOpen,
	isSubmitting,
	submitError,
	onClose,
	onSubmit,
}: AddDesignDialogProps) {
	const [validationError, setValidationError] = useState<string | null>(null);
	const [formState, setFormState] = useState<DesignFormState>(initialFormState);

	const updateField = (field: keyof DesignFormState, value: string) => {
		setValidationError(null);
		setFormState((previous) => ({ ...previous, [field]: value }));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValidationError(null);

		const area = Number(formState.area);
		const cost = Number(formState.cost);
		const embodiedCarbon = Number(formState.embodiedCarbon);
		const daylightScore = Number(formState.daylightScore);

		if (!Number.isFinite(area) || area <= 0) {
			setValidationError("Area must be a positive number.");
			return;
		}

		if (!Number.isInteger(cost) || cost < 0) {
			setValidationError("Cost must be a non-negative integer.");
			return;
		}

		if (!Number.isInteger(embodiedCarbon) || embodiedCarbon < 0) {
			setValidationError("Embodied carbon must be a non-negative integer.");
			return;
		}

		if (!Number.isFinite(daylightScore) || daylightScore < 0 || daylightScore > 1) {
			setValidationError("Daylight score must be a number between 0 and 1.");
			return;
		}

		const imageUrl = formState.imageUrl.trim();
		const notes = formState.notes.trim();

		onSubmit({
			name: formState.name.trim(),
			description: formState.description.trim(),
			imageUrl: imageUrl.length > 0 ? imageUrl : null,
			area,
			cost,
			embodiedCarbon,
			daylightScore,
			tags: formState.tags.trim(),
			notes: notes.length > 0 ? notes : null,
		});
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6">
			<div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
				<div className="mb-4">
					<h2 className="text-xl font-semibold text-slate-900">Add design option</h2>
					<p className="mt-1 text-sm text-slate-600">
						Provide all required values to create a new design option.
					</p>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="grid gap-4 md:grid-cols-2">
						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Name</span>
							<input
								required
								value={formState.name}
								onChange={(event) => updateField("name", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>

						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Image URL</span>
							<input
								type="url"
								value={formState.imageUrl}
								onChange={(event) => updateField("imageUrl", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>
					</div>

					<label className="grid gap-1 text-sm">
						<span className="font-medium text-slate-700">Description</span>
						<textarea
							required
							value={formState.description}
							onChange={(event) => updateField("description", event.target.value)}
							rows={3}
							className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
						/>
					</label>

					<div className="grid gap-4 md:grid-cols-2">
						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Area (m2)</span>
							<input
								required
								type="number"
								step="0.01"
								min="0"
								value={formState.area}
								onChange={(event) => updateField("area", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>

						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Cost</span>
							<input
								required
								type="number"
								step="1"
								min="0"
								value={formState.cost}
								onChange={(event) => updateField("cost", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Embodied carbon</span>
							<input
								required
								type="number"
								step="1"
								min="0"
								value={formState.embodiedCarbon}
								onChange={(event) => updateField("embodiedCarbon", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>

						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Daylight score (0-1)</span>
							<input
								required
								type="number"
								step="0.01"
								min="0"
								max="1"
								value={formState.daylightScore}
								onChange={(event) => updateField("daylightScore", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Tags (comma-separated)</span>
							<input
								value={formState.tags}
								onChange={(event) => updateField("tags", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>

						<label className="grid gap-1 text-sm">
							<span className="font-medium text-slate-700">Notes</span>
							<input
								value={formState.notes}
								onChange={(event) => updateField("notes", event.target.value)}
								className="h-10 rounded-md border border-slate-300 px-3 text-slate-900"
							/>
						</label>
					</div>

					{validationError ? <p className="text-sm text-rose-700">{validationError}</p> : null}
					{!validationError && submitError ? <p className="text-sm text-rose-700">{submitError}</p> : null}

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="default" onClick={onClose} disabled={isSubmitting}>
							Cancel
						</Button>
						<Button type="submit" variant="secondary" disabled={isSubmitting}>
							{isSubmitting ? "Adding..." : "Add design"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
