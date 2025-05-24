import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidPrimary: Story = {
  args: {
    type: "solid",
    variant: "primary",
    children: "Solid Primary",
  },
};

export const SolidDefault: Story = {
  args: {
    type: "solid",
    variant: "default",
    children: "Solid Default",
  },
};

export const OutlinePrimary: Story = {
  args: {
    type: "outline",
    variant: "primary",
    children: "Outline Primary",
  },
};
export const OutlineDefault: Story = {
  args: {
    type: "outline",
    variant: "default",
    children: "Outline Default",
  },
};
