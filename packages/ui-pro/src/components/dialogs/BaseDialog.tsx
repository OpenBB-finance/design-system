import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

export interface BaseDialogProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  trigger?: ReactNode;
}

interface Props extends BaseDialogProps {
  children?: ReactNode;
}

export function BaseDialog(props: Props) {
  const { open, onClose, className, trigger, children } = props;

  function handleOpenChange(open: boolean) {
    if (!open) onClose?.();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}
BaseDialog.displayName = "BaseDialog";
