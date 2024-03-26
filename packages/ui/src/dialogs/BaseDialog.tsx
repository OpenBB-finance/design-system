import { type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

export interface BaseDialogProps extends React.ComponentProps<typeof Dialog> {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  trigger?: ReactNode;
  modal?: boolean;
}

interface Props extends BaseDialogProps {
  children?: ReactNode;
}

export function BaseDialog(props: Props) {
  const { open, onClose, className, trigger, children, ...rest } = props;

  function handleOpenChange(open: boolean) {
    if (!open) onClose?.();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...rest}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}
BaseDialog.displayName = "BaseDialog";
