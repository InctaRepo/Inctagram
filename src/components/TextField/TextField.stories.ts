import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";

const meta = {
	title: "Components/TextField",
	component: TextField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "User name",
	},
};

export const Error: Story = {
	args: {
		label: "User name",
		errorMessage: "Error message",
	},
};

export const Disabled: Story = {
	args: {
		label: "User name",
		disabled: true,
	},
};
