import type React from "react";
import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

export type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

export interface BaseDialogProps extends React.ComponentProps<typeof Dialog> {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  trigger?: ReactNode;
  modal?: boolean;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  focusOnOpen?: boolean;
}

export interface BaseDialogElementProps extends BaseDialogProps {
  children?: ReactNode;
}

export function BaseDialog(props: BaseDialogElementProps) {
  const {
    open,
    onClose,
    className,
    trigger,
    children,
    onPointerDownOutside,
    modal,
    focusOnOpen = true,
  } = props;

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={modal}>
      {trigger ? <DialogTrigger asChild={true}>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={className}
        onPointerDownOutside={onPointerDownOutside}
        onOpenAutoFocus={(e) => {
          if (!focusOnOpen) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
BaseDialog.displayName = "BaseDialog";
