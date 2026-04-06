import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AddDesignDialog, type NewDesignOptionInput } from "./add-design-dialog";

const meta = {
	title: "Organisms/AddDesignDialog",
	component: AddDesignDialog,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		isOpen: true,
		isSubmitting: false,
		submitError: null,
		onClose: () => undefined,
		onSubmit: () => undefined,
	},
} satisfies Meta<typeof AddDesignDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function DefaultDialogStory(args: Story["args"]) {
	const [isOpen, setIsOpen] = useState(args?.isOpen ?? true);
	const [submitError, setSubmitError] = useState<string | null>(args?.submitError ?? null);

	const handleSubmit = (_input: NewDesignOptionInput) => {
		setSubmitError(null);
	};

	return (
		<div className="min-h-screen bg-slate-100 p-10">
			<AddDesignDialog
				{...args}
				isOpen={isOpen}
				isSubmitting={args?.isSubmitting ?? false}
				submitError={submitError}
				onClose={() => setIsOpen(false)}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export const Default: Story = {
	args: {
		onClose: () => undefined,
		onSubmit: () => undefined,
	},
	render: (args) => <DefaultDialogStory {...args} />,
};

export const WithError: Story = {
	args: {
		isOpen: true,
		submitError: "Server rejected this item. Please try again.",
		onClose: () => undefined,
		onSubmit: () => undefined,
	},
	render: (args) => (
		<div className="min-h-screen bg-slate-100 p-10">
			<AddDesignDialog {...args} onClose={() => undefined} onSubmit={() => undefined} />
		</div>
	),
};
