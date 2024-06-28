import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "~/utils/ThemedPreview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselRoot,
} from "./Carousel";

const meta = {
  title: "Molecules/Carousel",
  component: CarouselRoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CarouselRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <Carousel className="w-[50vw] max-w-[500px]" {...args}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex aspect-square items-center justify-center">
              <span className="title-lg-bold">{index + 1}</span>
            </div>
          ))}
        </Carousel>
      </div>
    </ThemedPreview>
  );
};

/** Example of how to compose Carousel from parts */
function ComposedCarousel(args: any) {
  return (
    <CarouselRoot {...args}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="px-1 py-4">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-grey-100 p-6 shadow-2 dark:bg-dark-850">
                <span className="title-lg-bold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-center gap-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </CarouselRoot>
  );
}

const renderComposed: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <ComposedCarousel {...args} />
    </ThemedPreview>
  );
};

/* Variants */

export const Default: Story = {
  args: {},
  render,
};

export const Composed: Story = {
  args: {
    opts: {
      align: "start",
      loop: true,
    },
  },
  render: renderComposed,
};
