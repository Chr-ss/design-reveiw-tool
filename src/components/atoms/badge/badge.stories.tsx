import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta = {
	title: "Atoms/Badge",
	component: Badge,
	tags: ["autodocs"],
	args: {
		children: "Tag",
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = {
	args: {
		variant: "secondary",
	},
};