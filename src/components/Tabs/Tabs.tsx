import { forwardRef, HTMLAttributes } from "react";
import { DefaultProps } from "../../utils/types";
import * as TabsPrimitive from "@radix-ui/react-tabs";
interface ITabsProps extends DefaultProps {}
export interface TabsProps
  extends HTMLAttributes<HTMLButtonElement>,
    ITabsProps {}

export const Tabs = forwardRef<HTMLDivElement, ITabsProps>((props, ref) => {
  const {} = props;
  return (
    <TabsPrimitive.Root
      defaultValue="Installer"
      orientation="horizontal"
      className="spacingbottom"
    >
      <TabsPrimitive.List className="mb-16 flex cursor-pointer justify-center text-sm md:text-base">
        <TabsPrimitive.Trigger
          className="border-b border-grey-tint-20 px-4 pb-2 uppercase tracking-widest text-grey-tint-20 hover:border-grey-tint-50 hover:text-grey-tint-50 active:border-white active:text-white radix-state-active:border-white radix-state-active:text-white md:px-10"
          value="Installer"
        ></TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content value=""></TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
});
