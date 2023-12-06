"use client";

import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useModalStore } from "~/store/modal.store";

type Props = {
  session: Session;
};
export function UserButton({ session }: Props) {
  const toggleAdminForm = useModalStore((state) => state.toggleAdmin);

  if (!session) {
    return null;
  }

  const {
    user: { role, image, name },
  } = session;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="overflow-hidden rounded-full">
          <Image src={image ?? ""} alt="avatar" width={40} height={40} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="max-w-[10rem] truncate">
            @{name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            {role === "ADMIN" && (
              <Link href={"/dashboard"} className="flex items-center gap-4">
                <LayoutDashboard className="h-4 w-4" />
                Панель управления
              </Link>
            )}
          </DropdownMenuItem>
          {role !== "ADMIN" && (
            <DropdownMenuItem
              onClick={toggleAdminForm}
              className="flex items-center gap-4"
            >
              <ShieldCheck className="h-4 w-4" /> Стать админом
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="flex w-full items-center gap-4 text-destructive focus:text-destructive"
            onClick={() => void signOut()}
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
