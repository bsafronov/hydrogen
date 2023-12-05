"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      className="flex items-center gap-4 text-destructive"
      onClick={() => void signOut()}
    >
      <LogOut className="h-4 w-4" />
      Выйти
    </button>
  );
}
