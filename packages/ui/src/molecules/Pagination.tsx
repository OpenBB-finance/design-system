import * as React from "react";
import { Icon } from "~/atoms/Icon";
import { clamp, cn } from "~/utils";
import { Button, ButtonProps } from "../atoms/Button";

interface PaginationItemProps extends ButtonProps {}

export const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  PaginationItemProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Button
      className={cn(
        "min-w-8 border-0 px-0.5 !subtitle-xs-bold",
        "duration-0", //! It looks not good with animation
        "radix-state-active:!bg-accent-600 radix-state-active:!text-grey-100",
        /* Light theme */
        "hover:bg-grey-100",
        /* Dark theme */
        "dark:hover:bg-dark-600",
        className,
      )}
      variant="outlined"
      size="sm"
      ref={ref}
      {...rest}
    />
  );
});
PaginationItem.displayName = "PaginationItem";

interface PaginationArrowProps extends ButtonProps {}

const PaginationArrow = React.forwardRef<
  HTMLButtonElement,
  PaginationArrowProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Button
      className={cn(
        "border-0",
        "duration-0", //! I have to switch off the animation because PaginationItem has it
        /* Light theme */
        "text-accent-600",
        "hover:bg-grey-100 hover:text-accent-400",
        "disabled:bg-transparent",
        /* Dark theme */
        "dark:text-accent-600",
        "dark:hover:bg-dark-600 dark:hover:text-accent-600",
        "dark:disabled:bg-transparent",
        className,
      )}
      variant="outlined"
      size="sm"
      icon
      ref={ref}
      {...rest}
    />
  );
});
PaginationArrow.displayName = "PaginationArrow";

export const PaginationPrev = React.forwardRef<
  HTMLButtonElement,
  PaginationArrowProps
>((props, ref) => {
  return (
    <PaginationArrow {...props} aria-label="Go to previous page" ref={ref}>
      <Icon name="chevron-left" className="size-4" />
    </PaginationArrow>
  );
});
PaginationPrev.displayName = "PaginationPrev";

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationArrowProps
>((props, ref) => {
  return (
    <PaginationArrow {...props} aria-label="Go to next page" ref={ref}>
      <Icon name="chevron-right" className="size-4" />
    </PaginationArrow>
  );
});
PaginationNext.displayName = "PaginationNext";

/* Composed component */

export interface PaginationProps extends React.ComponentProps<"nav"> {
  items: number;
  perPage: number;
  currentPage: number;
  displayPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      className,
      items,
      perPage,
      currentPage,
      displayPages = 5,
      onPageChange,
      ...rest
    } = props;

    const half = Math.floor(displayPages / 2);
    const lastPage = Math.ceil(items / perPage);
    const clampedPage = clamp(currentPage, 1, lastPage);
    const minPage = Math.max(
      1, //                Shows more pages when current close to end
      clampedPage - half - Math.max(clampedPage + half - lastPage, 0),
    );
    const maxPage = Math.min(minPage + displayPages - 1, lastPage);
    const pageRange = Array.from(
      { length: maxPage - minPage + 1 },
      (_, i) => i + minPage,
    );

    const canPrev = clampedPage > 1;
    const canNext = clampedPage < lastPage;

    function handlePrev() {
      if (canPrev) {
        onPageChange(clampedPage - 1);
      }
    }

    function handleNext() {
      if (canNext) {
        onPageChange(clampedPage + 1);
      }
    }

    React.useEffect(() => {
      // Check out of bounds
      if (currentPage !== clampedPage) {
        onPageChange(clampedPage);
      }
    }, [currentPage, lastPage, onPageChange]);

    if (lastPage <= 1) return null;

    return (
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn(
          "shadow-1 mx-auto flex w-full justify-center gap-4 rounded-xl px-10 py-2.5",
          "bg-white",
          "dark:bg-dark-800",
          className,
        )}
        {...rest}
      >
        <PaginationPrev icon disabled={!canPrev} onClick={handlePrev} />
        {pageRange.map((p) => (
          <PaginationItem
            key={p}
            data-state={p === clampedPage ? "active" : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </PaginationItem>
        ))}
        <PaginationNext icon disabled={!canNext} onClick={handleNext} />
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
