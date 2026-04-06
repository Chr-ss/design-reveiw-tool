import type { Meta, StoryObj } from "@storybook/react";

import { Tags } from "./tags";

const meta = {
	title: "Molecules/Tags",
	component: Tags,
	tags: ["autodocs"],
	args: {
		tags: ["courtyard", "daylight", "compact", "low-carbon"],
	},
} satisfies Meta<typeof Tags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
