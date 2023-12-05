"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export function Logout() {
  return (
    <DropdownMenuItem
      className="flex w-full items-center gap-4 text-destructive focus:text-destructive"
      onClick={() => void signOut()}
    >
      <LogOut className="h-4 w-4" />
      Выйти
    </DropdownMenuItem>
  );
}
