"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/atoms/button/button";
import { Image } from "@/components/atoms/image/image";
import { DataBlock } from "@/components/molecules/data-block/data-block";
import { api } from "@/trpc/react";

type ComparedOptionData = {
	id: string;
	name: string;
	description: string;
	imageUrl: string | null;
	area: number;
	cost: number;
	embodiedCarbon: number | null;
	daylightScore: number | null;
	tags: string;
	notes: string | null;
};

function ComparedOption({ option }: { option: ComparedOptionData }) {
	return (
		<article className="border border-slate-200 bg-white p-5 shadow-sm">
			<h2 className="text-xl font-semibold text-slate-900">{option.name}</h2>
			<p className="mt-2 text-sm leading-6 text-slate-700">{option.description}</p>

			<div className="mt-4">
				{option.imageUrl ? (
					<Image src={option.imageUrl} alt={`${option.name} preview`} className="aspect-[4/3] rounded-none" />
				) : (
					<div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
						No image available
					</div>
				)}
			</div>

			<DataBlock
				className="mt-4"
				area={option.area}
				cost={option.cost}
				daylightScore={option.daylightScore}
				embodiedCarbon={option.embodiedCarbon}
				tags={option.tags}
			/>

			{option.notes ? <p className="mt-4 text-sm text-slate-600">{option.notes}</p> : null}
		</article>
	);
}

function InvalidCompareState({ message }: { message: string }) {
	return (
		<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
			<section className="border border-amber-200 bg-amber-50 p-6">
				<h1 className="text-xl font-semibold text-amber-900">Cannot compare these designs</h1>
				<p className="mt-2 text-sm text-amber-800">{message}</p>
				<div className="mt-4">
					<Button asChild variant="secondary">
						<Link href="/">Back to overview</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}

export default function CompareDesignOptionsPage() {
	const searchParams = useSearchParams();
	const id1 = searchParams.get("id1") ?? "";
	const id2 = searchParams.get("id2") ?? "";
	const invalidReason = !id1
		? "Select two design options from the overview before comparing."
		: !id2
			? "Select two design options from the overview before comparing."
			: id1 === id2
				? "Choose two different design options for comparison."
				: null;

	const optionsQuery = api.designOption.byIds.useQuery(
		{ ids: [id1 || "missing-id-1", id2 || "missing-id-2"] },
		{ enabled: invalidReason === null },
	);

	if (invalidReason) {
		return <InvalidCompareState message={invalidReason} />;
	}

	if (optionsQuery.isLoading) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<section className="border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-600">Loading design comparison...</p>
				</section>
			</main>
		);
	}

	if (optionsQuery.error) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<section className="border border-rose-200 bg-rose-50 p-6">
					<h1 className="text-xl font-semibold text-rose-900">Unable to compare these designs</h1>
					<p className="mt-2 text-sm text-rose-800">{optionsQuery.error.message}</p>
					<div className="mt-4">
						<Button asChild variant="secondary">
							<Link href="/">Back to overview</Link>
						</Button>
					</div>
				</section>
			</main>
		);
	}

	const comparedOptions = optionsQuery.data;

	if (!comparedOptions || comparedOptions.length !== 2) {
		return <InvalidCompareState message="Both design options must exist to compare side-by-side." />;
	}

	return (
		<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
			<div className="grid gap-4 lg:grid-cols-2">
				<ComparedOption option={comparedOptions[0]} />
				<ComparedOption option={comparedOptions[1]} />
			</div>
		</main>
	);
}
