import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import ThemedPreview from "~/utils/ThemedPreview";
import { Pagination } from "./Pagination";

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  const { items, perPage, currentPage } = args;
  const [page, setPage] = useState(currentPage);

  const paginatedItems = Array.from({ length: perPage }, (_, i) => {
    const n = (page - 1) * perPage + i + 1;
    return n > items ? null : n;
  }).filter(Boolean);

  return (
    <ThemedPreview>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {paginatedItems.map((n) => (
            <div
              key={n}
              className="subtitle-lg-bold flex aspect-square items-center justify-center rounded-lg bg-dark-50 p-4 text-dark-800"
            >
              {n}
            </div>
          ))}
        </div>
        <Pagination {...args} currentPage={page} onPageChange={setPage} />
      </div>
    </ThemedPreview>
  );
};

/* Variants */

export const Default: Story = {
  args: {
    items: 65,
    perPage: 6,
    currentPage: 3,
    onPageChange: () => {},
  },
  render,
};

export const FirstPage: Story = {
  args: {
    ...Default.args,
    currentPage: 1,
  },
  render,
};

export const LastPage: Story = {
  args: {
    ...Default.args,
    currentPage: 11,
  },
  render,
};

export const ShowThreePages: Story = {
  args: {
    ...Default.args,
    displayPages: 3,
  },
  render,
};

/** And test out of range */
export const FewPages: Story = {
  args: {
    ...Default.args,
    items: 10,
  },
  render,
};
