import { type ReactNode } from "react";

import { cn } from "~/utils";
import { Button } from "../ui";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { BaseDialog, type BaseDialogProps } from "./BaseDialog";

interface BaseProps extends BaseDialogProps {
  title: string;
  description?: string;
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

export type ConfirmDialogProps =
  | PropsWithConfirmButton
  | PropsWithConfirmParams;

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
    if ("confirmButton" in props) return props.confirmButton;

    const { confirmText = "Confirm", onConfirm } = props;

    return (
      <Button variant="primary" onClick={onConfirm}>
        {confirmText}
      </Button>
    );
  }

  function renderActions() {
    return (
      <DialogFooter>
        {renderConfirmButton()}
        <DialogClose asChild>
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
        </DialogClose>
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
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {renderActions()}
        </>
      )}
    </BaseDialog>
  );
}
