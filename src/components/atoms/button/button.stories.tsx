import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
	title: "Atoms/Button",
	component: Button,
	tags: ["autodocs"],
	args: {
		children: "Button",
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = {
	args: {
		variant: "secondary",
	},
};