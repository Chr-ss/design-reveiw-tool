import Link from "next/link";

import { Image } from "@/components/atoms/image/image";
import { Skeleton } from "@/components/atoms/skeleton/skeleton";
import { Tags } from "@/components/molecules/tags/tags";
import { cn } from "@/lib/utils";

function Separator({ className }: { className?: string }) {
	return <div aria-hidden className={className ?? "h-px w-full bg-slate-200"} />;
}

function CostIcon() {
	return (
		<svg
			aria-hidden="true"
			className="h-4 w-4 shrink-0"
			viewBox="0 0 24 24"
			fill="000000"
		>
			<path d="M15 18.5A6.48 6.48 0 0 1 9.24 15H15l1-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15l1-2H9.24A6.491 6.491 0 0 1 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3A8.955 8.955 0 0 0 15 3c-3.92 0-7.24 2.51-8.48 6H3l-1 2h4.06a8.262 8.262 0 0 0 0 2H3l-1 2h4.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z" />
		</svg>
	);
}

function DaylightIcon() {
	return (
		<svg
			aria-hidden="true"
			className="h-4 w-4 shrink-0"
			viewBox="0 0 24 24"
			fill="000000"
		>
			<path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.4１-１．４１z" />
		</svg>
	);
}

function CarbonIcon() {
	return (
		<svg
			aria-hidden="true"
			className="h-4 w-4 shrink-0"
			viewBox="0 0 24 24"
			fill="000000"
		>
			<path d="M14 9h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm-.5 4.5h-2v-3h2v3zM8 13v1c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1H6.5v-.5h-2v3h2V13H8zm12.5 2.5h-2v1h3V18H17v-2.5c0-.55.45-1 1-1h2v-1h-3V12h3.5c.55 0 1 .45 1 1v1.5c0 .55-.45 1-1 1z" />
		</svg>
	);
}

export type DesignOptionCardData = {
  id: string;
  name: string;
  description: string;
	imageUrl?: string | null;
  area: number;
  cost: number;
  embodiedCarbon?: number | null;
  daylightScore?: number | null;
  tags: string;
  notes?: string | null;
};

type DesignOptionCardProps = {
  option: DesignOptionCardData;
  isSelected?: boolean;
  selectionEnabled?: boolean;
  selectionDisabled?: boolean;
  onToggleSelect?: (optionId: string) => void;
};

export function DesignOptionCard({
	option,
	isSelected = false,
	selectionEnabled = false,
	selectionDisabled = false,
	onToggleSelect,
}: DesignOptionCardProps) {
	const canToggleSelect = !selectionDisabled || isSelected;

	const handleCardToggle = () => {
		if (!selectionEnabled || !canToggleSelect) {
			return;
		}

		onToggleSelect?.(option.id);
	};

	const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
		const target = event.target as HTMLElement;

		if (target.closest("a, button, input, textarea, select, label")) {
			return;
		}

		handleCardToggle();
	};

	const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key !== " " && event.key !== "Enter") {
			return;
		}

		event.preventDefault();
		handleCardToggle();
	};

	return (
		<article
			className={cn(
				"border p-4 transition-colors",
				selectionEnabled ? (canToggleSelect ? "cursor-pointer" : "cursor-not-allowed") : null,
				isSelected ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white",
			)}
			onClick={selectionEnabled ? handleCardClick : undefined}
			onKeyDown={selectionEnabled ? handleCardKeyDown : undefined}
			tabIndex={selectionEnabled ? 0 : undefined}
			role={selectionEnabled ? "button" : undefined}
			aria-pressed={selectionEnabled ? isSelected : undefined}
		>
			<div>
				<h3 className="text-lg font-medium">
					<Link
						href={`/design-options/${option.id}`}
						className="underline-offset-4 hover:text-slate-900 hover:underline"
					>
						{option.name}
					</Link>
				</h3>
			</div>

			<div className="mt-3 grid gap-4 md:grid-cols-[1.2fr_1fr] md:items-stretch">
				<div className="md:h-full">
					{option.imageUrl ? (
						<Image
							src={option.imageUrl}
							alt={`${option.name} preview`}
							className="md:h-full md:aspect-auto"
						/>
					) : (
						<div className="flex aspect-square w-full items-center justify-center border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 md:h-full md:aspect-auto">
							No image available
						</div>
					)}
				</div>

				<dl className="grid gap-0 text-sm">
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<dt className="sr-only">Area</dt>
						<dd className="flex w-full items-center justify-end gap-1 font-medium text-slate-900 tabular-nums">
							<span>{option.area}</span>
							<span className="inline-flex w-4 justify-end">m²</span>
						</dd>
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<dt className="sr-only">Cost</dt>
						<dd className="flex w-full items-center justify-end gap-1 font-medium text-slate-900 tabular-nums">
							<span>{option.cost.toLocaleString()}</span>
							<span className="inline-flex w-4 justify-end">
								<CostIcon />
							</span>
						</dd>
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<dt className="sr-only">Daylight</dt>
						<dd className="flex w-full items-center justify-end gap-1 font-medium text-slate-900 tabular-nums">
							<span>{option.daylightScore ?? "—"}</span>
							<span className="inline-flex w-4 justify-end">
								<DaylightIcon />
							</span>
						</dd>
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<dt className="sr-only">Carbon</dt>
						<dd className="flex w-full items-center justify-end gap-1 font-medium text-slate-900 tabular-nums">
							<span>{option.embodiedCarbon ?? "—"}</span>
							<span className="inline-flex w-4 justify-end">
								<CarbonIcon />
							</span>
						</dd>
					</div>
				</dl>
			</div>

			<Separator className="mt-4 h-px w-full bg-slate-200" />
			<div className="pt-3">
				<Tags tags={option.tags} />
			</div>
		</article>
	);
}

export function DesignOptionCardSkeleton() {
	return (
		<article className="border border-slate-200 p-4">
			<div>
				<Skeleton className="h-5 w-3/5" />
			</div>

			<div className="mt-3 grid gap-4 md:grid-cols-[1.2fr_1fr] md:items-start">
				<Skeleton className="aspect-square w-full" />

				<dl className="grid gap-0 text-sm">
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<Skeleton className="h-4 w-10" />
						<Skeleton className="h-4 w-14" />
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<Skeleton className="h-4 w-10" />
						<Skeleton className="h-4 w-16" />
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-4 w-12" />
					</div>
					<Separator className="h-px w-full bg-slate-200" />
					<div className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-4 w-12" />
					</div>
				</dl>
			</div>

			<Separator className="mt-4 h-px w-full bg-slate-200" />
			<div className="pt-3">
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-12 rounded-full" />
					<Skeleton className="h-6 w-14 rounded-full" />
					<Skeleton className="h-6 w-10 rounded-full" />
				</div>
			</div>
		</article>
	);
}
