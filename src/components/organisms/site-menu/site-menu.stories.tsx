import type { Meta, StoryObj } from "@storybook/react";

import { SiteMenu } from "./site-menu";

const meta = {
	title: "Organisms/SiteMenu",
	component: SiteMenu,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SiteMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
