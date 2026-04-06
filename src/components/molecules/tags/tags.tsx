import { Badge } from "@/components/atoms/badge/badge";

const badgeVariants = ["blue", "green", "amber", "rose", "purple", "cyan"] as const;

type TagsProps = {
	tags: string | string[];
	emptyLabel?: string;
};

function parseTags(tags: string | string[]) {
	if (Array.isArray(tags)) {
		return tags.map((tag) => tag.trim()).filter(Boolean);
	}

	return tags
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);
}

export function Tags({ tags, emptyLabel = "—" }: TagsProps) {
	const parsedTags = parseTags(tags);

	if (parsedTags.length === 0) {
		return <span className="font-medium text-slate-600">{emptyLabel}</span>;
	}

	return (
		<div className="flex flex-wrap gap-2">
			{parsedTags.map((tag, index) => (
				<Badge key={`${tag}-${index}`} variant={badgeVariants[index % badgeVariants.length]}>
					{tag}
				</Badge>
			))}
		</div>
	);
}
