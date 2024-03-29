import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";
import { useImperativeHandle } from "react";
import { cn } from "~/utils";
import type { ButtonProps } from "../atoms/Button";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type TCarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  current: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & TCarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <CarouselRoot />");
  }

  return context;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TCarouselProps {}
/**
 * @see {@link https://ui.shadcn.com/docs/components/carousel | Shadcn/ui Docs - Carousel} for more information
 */
export const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref) => {
    const {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...rest
    } = props;
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [current, setCurrent] = React.useState(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          current,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...rest}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
CarouselRoot.displayName = "Carousel";

interface CarouselContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TCarouselProps {}
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "relative flex",
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TCarouselProps {}
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, forwardedRef) => {
    const { orientation, current, api } = useCarousel();
    const ref = React.useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const slides = api?.slideNodes() ?? [];
    const index = ref.current ? Array.from(slides).indexOf(ref.current) : null;
    const isActive = index === current;

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        data-index={index}
        data-active={isActive}
        className={cn(
          "CarouselItem min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "px-2" : "py-2",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const { variant = "secondary", size = "md", icon = true, ...rest } = props;
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      icon={icon}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...rest}
    >
      <Icon name="chevron-left" size={18} />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { variant = "secondary", size = "md", icon = true, ...rest } = props;
    const { scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        icon={icon}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...rest}
      >
        <Icon name="chevron-right" size={18} />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

interface CarouselDotsProps {
  className?: string;
}
export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  (props, ref) => {
    const { className } = props;
    const { api, current } = useCarousel();

    return (
      <div
        className={cn("CarouselDots flex items-center gap-3.5", className)}
        ref={ref}
      >
        {api
          ?.slideNodes()
          .map((slide, i) => (
            <div
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "CarouselDot aspect-square h-fit w-2.5 cursor-pointer rounded-full bg-white/30 transition",
                i === current && "_active scale-[1.20] bg-white",
              )}
            />
          ))}
      </div>
    );
  },
);
CarouselDots.displayName = "CarouselDots";

/* Composed component */

/**
 * @see {@link https://ui.shadcn.com/docs/components/carousel | Shadcn/ui Docs - Carousel} for more information
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref) => {
    const { children, opts = { align: "start", loop: true }, ...rest } = props;
    return (
      <CarouselRoot ref={ref} opts={opts} {...rest}>
        <CarouselContent>
          {React.Children.map(children, (child, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="px-1 py-4">
                <div className="shadow-2 rounded-lg bg-grey-100 dark:bg-dark-850">
                  {child}
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
  },
);
Carousel.displayName = "Carousel";
