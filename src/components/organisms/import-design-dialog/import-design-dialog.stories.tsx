import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
	ImportDesignDialog,
	type ImportDesignInput,
} from "./import-design-dialog";

const meta = {
	title: "Organisms/ImportDesignDialog",
	component: ImportDesignDialog,
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
} satisfies Meta<typeof ImportDesignDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function DefaultImportDialogStory(args: Story["args"]) {
	const [isOpen, setIsOpen] = useState(args?.isOpen ?? true);
	const [submitError, setSubmitError] = useState<string | null>(args?.submitError ?? null);

	const handleSubmit = (_input: ImportDesignInput) => {
		setSubmitError(null);
	};

	return (
		<div className="min-h-screen bg-slate-100 p-10">
			<ImportDesignDialog
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
	render: (args) => <DefaultImportDialogStory {...args} />,
};

export const Loading: Story = {
	args: {
		isSubmitting: true,
	},
	render: (args) => (
		<div className="min-h-screen bg-slate-100 p-10">
			<ImportDesignDialog {...args} onClose={() => undefined} onSubmit={() => undefined} />
		</div>
	),
};

export const WithError: Story = {
	args: {
		submitError: "Endpoint payload is not supported.",
	},
	render: (args) => (
		<div className="min-h-screen bg-slate-100 p-10">
			<ImportDesignDialog {...args} onClose={() => undefined} onSubmit={() => undefined} />
		</div>
	),
};
