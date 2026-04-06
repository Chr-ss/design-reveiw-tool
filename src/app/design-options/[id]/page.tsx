"use client";

import { useParams } from "next/navigation";

import { DataBlock } from "@/components/molecules/data-block/data-block";
import { Image } from "@/components/atoms/image/image";
import { api } from "@/trpc/react";

export default function DesignOptionDetailsPage() {
	const params = useParams<{ id: string }>();
	const id = params?.id ?? "";

	const optionQuery = api.designOption.byId.useQuery(
		{ id },
		{
			enabled: id.length > 0,
		},
	);

	if (optionQuery.isLoading) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<section className="border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-600">Loading design details...</p>
				</section>
			</main>
		);
	}

	if (optionQuery.error) {
		return (
			<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
				<section className="border border-rose-200 bg-rose-50 p-6">
					<h1 className="text-xl font-semibold text-rose-900">Unable to load this design</h1>
					<p className="mt-2 text-sm text-rose-800">{optionQuery.error.message}</p>
				</section>
			</main>
		);
	}

	const option = optionQuery.data;

	if (!option) {
		return null;
	}

	return (
		<main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
			<section className="border border-slate-200 bg-white p-6 shadow-sm">
				<div className="space-y-4">
					<h1 className="text-2xl font-semibold text-slate-900">{option.name}</h1>
					<p className="text-sm leading-6 text-slate-700">{option.description}</p>

					<div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
						<div className="space-y-4">
							{option.imageUrl ? (
								<Image src={option.imageUrl} alt={`${option.name} preview`} className="rounded-none md:aspect-[4/3]" />
							) : (
								<div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
									No image available
								</div>
							)}
						</div>

						<div className="space-y-4">
							<DataBlock
								area={option.area}
								cost={option.cost}
								daylightScore={option.daylightScore}
								embodiedCarbon={option.embodiedCarbon}
								tags={option.tags}
							/>
							{option.notes ? <p className="text-sm text-slate-600">{option.notes}</p> : null}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
