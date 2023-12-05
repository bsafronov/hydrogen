"use client";

import { ShieldCheck } from "lucide-react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useModalStore } from "~/store/modal.store";

export function AdminFormButton() {
  const toggleAdminForm = useModalStore((state) => state.toggleAdmin);
  return (
    <DropdownMenuItem
      onClick={toggleAdminForm}
      className="flex items-center gap-4"
    >
      <ShieldCheck className="h-4 w-4" /> Стать админом
    </DropdownMenuItem>
  );
}
