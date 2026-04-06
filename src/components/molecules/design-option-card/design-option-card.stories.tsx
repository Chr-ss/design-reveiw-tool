import type { Meta, StoryObj } from "@storybook/react";

import { DesignOptionCard } from "./design-option-card";

const meta = {
	title: "Molecules/DesignOptionCard",
	component: DesignOptionCard,
	tags: ["autodocs"],
	args: {
		option: {
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
	},
} satisfies Meta<typeof DesignOptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selectable: Story = {
	args: {
		selectionEnabled: true,
	},
};

export const Selected: Story = {
	args: {
		selectionEnabled: true,
		isSelected: true,
	},
};

export const SelectionLimitReached: Story = {
	args: {
		selectionEnabled: true,
		selectionDisabled: true,
	},
};
