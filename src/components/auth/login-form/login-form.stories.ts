import type { Meta, StoryObj } from "@storybook/react";

import { LogInform } from "./LogIn-form";

const meta = {
  title: "Auth/LogInForm",
  component: LogInform,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LogInform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
