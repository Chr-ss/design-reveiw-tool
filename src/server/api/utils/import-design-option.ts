import { type Prisma } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
	id: z.number().int().positive(),
	title: z.string().min(1),
	description: z.string().min(1),
	price: z.number().nonnegative(),
	rating: z.number().min(0).max(5),
	thumbnail: z.string().url(),
	weight: z.number().nonnegative().optional(),
	tags: z.array(z.string()).optional(),
	category: z.string().optional(),
	brand: z.string().optional(),
	stock: z.number().int().nonnegative().optional(),
	dimensions: z
		.object({
			width: z.number().positive(),
			height: z.number().positive(),
			depth: z.number().positive(),
		})
		.optional(),
});

const productListPayloadSchema = z.object({
	products: z.array(productSchema),
});

type MapResult = {
	data: Prisma.DesignOptionCreateManyInput[];
	errors: string[];
};

export function mapPublicProductsToDesignOptions(payload: unknown): MapResult {
	const parsed = productListPayloadSchema.safeParse(payload);

	if (!parsed.success) {
		return {
			data: [],
			errors: ["Endpoint payload must be an object with a 'products' array."],
		};
	}

	const records = parsed.data.products.map((product, index) => {
		const derivedArea = product.dimensions ? product.dimensions.width * product.dimensions.depth : 0;
		const derivedEmbodiedCarbon = product.weight ? product.weight * 2.3 : derivedArea * 0.8;
		const daylightScore = Math.max(0, Math.min(1, product.rating / 5));
		const sourceTags = product.tags?.filter((tag) => tag.trim().length > 0) ?? [];
		const tags = sourceTags.length > 0 ? sourceTags.join(",") : "imported";
		const notesParts = [`Source product id: ${product.id}`,
							typeof product.stock === "number" ? `Stock: ${product.stock}` : null,
		].filter(Boolean);

		return {
			name: product.title.slice(0, 80),
			description: product.description,
			imageUrl: product.thumbnail,
			area: Number(derivedArea.toFixed(2)),
			cost: Math.round(product.price),
			embodiedCarbon: Number(derivedEmbodiedCarbon.toFixed(2)),
			daylightScore: Number(daylightScore.toFixed(2)),
			tags,
			notes: notesParts.join(" | "),
		};
	});

	return {
		data: records,
		errors: records.length > 0 ? [] : ["Endpoint returned no records to import."],
	};
}
