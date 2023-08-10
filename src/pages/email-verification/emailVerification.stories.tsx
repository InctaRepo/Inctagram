import type { StoryObj } from "@storybook/react";
import { EmailVerification } from "@/src/pages/email-verification/EmailVerification";

const meta = {
  title: "pages/EmailVerification",
  component: EmailVerification,
};

export default meta;
type Story = StoryObj<typeof EmailVerification>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
