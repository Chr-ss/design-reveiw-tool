import type { Meta, StoryObj } from "@storybook/react";

import { DataBlock, DataBlockSkeleton } from "./data-block";

const meta = {
	title: "Molecules/DataBlock",
	component: DataBlock,
	tags: ["autodocs"],
	args: {
		area: 1450,
		cost: 1850000,
		embodiedCarbon: 420,
		daylightScore: 0.82,
		tags: "courtyard, daylight, low-carbon",
	},
} satisfies Meta<typeof DataBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	render: () => <DataBlockSkeleton />,
};
