import type { ReactNode } from "react";
import { cn } from "~/utils";
import { Button } from "../atoms";
import { BaseDialog, type BaseDialogProps } from "./BaseDialog";
import { DialogClose, DialogDescription, DialogFooter, DialogTitle } from "./Dialog";

interface BaseProps extends BaseDialogProps {
  title: ReactNode;
  description?: ReactNode;
  cancelText?: string;
  children?: ReactNode;
}

interface PropsWithConfirmButton extends BaseProps {
  confirmButton: ReactNode;
}

interface PropsWithConfirmParams extends BaseProps {
  confirmText?: string;
  onConfirm: () => void;
}

export type ConfirmDialogProps = PropsWithConfirmButton | PropsWithConfirmParams;

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    open,
    onClose,
    title,
    description,
    trigger,
    children,
    className,
    cancelText = "Cancel",
  } = props;

  const dialogClasses = cn("gap-4 md:gap-6", className);

  function renderConfirmButton() {
    if ("confirmButton" in props) {
      return props.confirmButton;
    }

    const { confirmText = "Confirm", onConfirm } = props;

    return (
      <Button variant="primary" size="sm" onClick={onConfirm}>
        {confirmText}
      </Button>
    );
  }

  function renderActions() {
    return (
      <DialogFooter>
        <DialogClose asChild={true}>
          <Button variant="outlined" size="sm" onClick={onClose}>
            {cancelText}
          </Button>
        </DialogClose>
        {renderConfirmButton()}
      </DialogFooter>
    );
  }

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      trigger={trigger}
      className={dialogClasses}
    >
      {children ?? (
        <>
          <div className="space-y-3">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </div>
          {renderActions()}
        </>
      )}
    </BaseDialog>
  );
}
ConfirmDialog.displayName = "ConfirmDialog";
