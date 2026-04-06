import { Skeleton } from "@/components/atoms/skeleton/skeleton";
import { Tags } from "@/components/molecules/tags/tags";

type MetricRowProps = {
	label: string;
	value: string;
};

function MetricRow({ label, value }: MetricRowProps) {
	return (
		<div className="flex items-center justify-between border-b border-slate-200 py-2 last:border-b-0">
			<span className="text-sm text-slate-600">{label}</span>
			<span className="text-sm font-medium text-slate-900">{value}</span>
		</div>
	);
}

export type DataBlockProps = {
	area: number;
	cost: number;
	daylightScore: number | null;
	embodiedCarbon: number | null;
	tags: string;
	className?: string;
};

export function DataBlock({
	area,
	cost,
	daylightScore,
	embodiedCarbon,
	tags,
	className,
}: DataBlockProps) {
	return (
		<div className={`border border-slate-200 bg-slate-50 p-4 ${className ?? ""}`.trim()}>
			<MetricRow label="Area" value={`${area} m2`} />
			<MetricRow label="Cost" value={cost.toLocaleString()} />
			<MetricRow
				label="Daylight"
				value={daylightScore !== null ? String(daylightScore) : "-"}
			/>
			<MetricRow
				label="Embodied carbon"
				value={embodiedCarbon !== null ? String(embodiedCarbon) : "-"}
			/>
			<div className="pt-4">
				<Tags tags={tags} />
			</div>
		</div>
	);
}

export function DataBlockSkeleton({ className }: { className?: string }) {
	return (
		<div className={`border border-slate-200 bg-slate-50 p-4 ${className ?? ""}`.trim()}>
			<div className="space-y-2">
				<div className="flex items-center justify-between border-b border-slate-200 py-2">
					<Skeleton className="h-4 w-12" />
					<Skeleton className="h-4 w-16" />
				</div>
				<div className="flex items-center justify-between border-b border-slate-200 py-2">
					<Skeleton className="h-4 w-12" />
					<Skeleton className="h-4 w-20" />
				</div>
				<div className="flex items-center justify-between border-b border-slate-200 py-2">
					<Skeleton className="h-4 w-14" />
					<Skeleton className="h-4 w-14" />
				</div>
				<div className="flex items-center justify-between border-b border-slate-200 py-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-14" />
				</div>
			</div>

			<div className="pt-4">
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-16 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-14 rounded-full" />
				</div>
			</div>
		</div>
	);
}
