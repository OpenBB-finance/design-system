import { type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

export interface BaseDialogProps extends React.ComponentProps<typeof Dialog> {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  trigger?: ReactNode;
  modal?: boolean;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
}

interface Props extends BaseDialogProps {
  children?: ReactNode;
}

export function BaseDialog(props: Props) {
  const {
    open,
    onClose,
    className,
    trigger,
    children,
    onPointerDownOutside,
    ...rest
  } = props;

  function handleOpenChange(open: boolean) {
    if (!open) onClose?.();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...rest}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        onPointerDownOutside={onPointerDownOutside}
        className={className}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
BaseDialog.displayName = "BaseDialog";
