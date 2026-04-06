import type { Meta, StoryObj } from "@storybook/react";

import { DesignOptionsGrid, DesignOptionsGridSkeleton } from "./design-options-grid";

const meta = {
	title: "Organisms/DesignOptionsGrid",
	component: DesignOptionsGrid,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		options: [
			{
				id: "1",
				name: "Courtyard Scheme",
				description: "A compact option with strong daylighting and a central courtyard.",
				imageUrl:
					"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
				area: 1450,
				cost: 1850000,
				embodiedCarbon: 420,
				daylightScore: 0.82,
				tags: "courtyard, daylight, low-carbon",
				notes: "Best suited for mixed-use urban infill.",
			},
			{
				id: "2",
				name: "Linear Bar",
				description: "A longer form with efficient circulation and simple structure.",
				imageUrl:
					"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
				area: 1820,
				cost: 2230000,
				embodiedCarbon: 510,
				daylightScore: 0.74,
				tags: "linear, efficient, flexible",
				notes: "Good for repeatable residential layouts.",
			},
		],
	},
} satisfies Meta<typeof DesignOptionsGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectionEnabled: Story = {
	args: {
		selectionEnabled: true,
		selectedIds: ["1"],
	},
};

export const CompareReady: Story = {
	args: {
		selectionEnabled: true,
		selectedIds: ["1", "2"],
		selectionLimitReached: true,
	},
};

export const Empty: Story = {
	args: {
		options: [],
		emptyState: (
			<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600">
				No design options yet.
			</div>
		),
	},
};

export const Skeleton: StoryObj = {
	render: () => <DesignOptionsGridSkeleton count={6} />,
};
