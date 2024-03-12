import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils";

/**
 *  @deprecated - see LinkButton notation
 */
const linkButtonVariants = cva(
  [
    "BB-LinkButton inline-flex items-center justify-center gap-2 rounded-sm p-2 font-normal text-grey-400 body-sm-regular",
    "hover:text-grey-200",
    "active:text-white",
    "focus-visible:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:text-grey-600",
    "transition",
  ],
  {
    variants: {
      variant: {
        primary: "",
        secondary: [
          "w-full px-[10px]",
          "hover:bg-grey-800",
          "active:bg-grey-700",
          "focus-visible:bg-grey-500",
          "disabled:bg-[none]",
        ],
        outlined: [
          "w-full border border-grey-400 px-[10px]",
          "hover:border-grey-200 hover:bg-grey-800",
          "active:border-grey-200 active:bg-grey-700",
          "focus-visible:border-grey-200 focus-visible:bg-grey-500",
          "disabled:bg-[none] disabled:text-grey-600",
        ],
      },
      icon: {
        true: "p-[10px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof linkButtonVariants> {
  /** Apply props and styles to child component  */
  asChild?: boolean;
}

/**
 * @deprecated don't use this component until it's purpose is clear. Probably it's outdated. Will be deleted in 1.0!
 * https://www.figma.com/file/WqgBjD9eBWEHOrPZ4AD8bg/Componentes---Atoms?type=design&node-id=13-300&mode=design&t=8MUMY19PP87Smz2R-4
 */
const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "primary",
      icon = false,
      asChild = false,
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(linkButtonVariants({ variant, icon }), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";

export { LinkButton, linkButtonVariants };
