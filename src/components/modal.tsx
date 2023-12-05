"use client";

import {
  type ModalStoreActions,
  type ModalStoreSelectors,
  useModalStore,
} from "~/store/modal.store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  selector: keyof ModalStoreSelectors;
  action: keyof ModalStoreActions;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function Modal({
  action,
  title,
  description,
  selector,
  children,
}: Props) {
  const open = useModalStore((state) => state[selector]);
  const onOpenChange = useModalStore((state) => state[action]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
