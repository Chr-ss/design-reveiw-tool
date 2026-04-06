import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "./image";

const meta = {
	title: "Atoms/Image",
	component: Image,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className="w-[320px] max-w-[90vw]">
				<Story />
			</div>
		),
	],
	args: {
		src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1000&q=80",
		alt: "Modern interior with natural light",
	},
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoadErrorPlaceholder: Story = {
	args: {
		src: "https://example.invalid/non-existent-image.jpg",
		alt: "Broken image source",
	},
};

export const NoPreview: Story = {
	args: {
		enablePreview: false,
		alt: "Preview disabled",
	},
};
