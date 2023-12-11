"use client";

import { LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
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

type Props = {
  session: Session;
};
export function UserButton({ session }: Props) {
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
          {image && (
            <div className="relative h-10 w-10">
              <Image
                src={image}
                alt="avatar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover"
              />
            </div>
          )}
          {!image && (
            <div className="flex h-10 w-10 items-center justify-center bg-muted">
              <UserRound className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="max-w-[10rem] truncate">
            {name ? `@${name}` : "Аноним"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-4" asChild>
            <Link href={"/profile"}>
              <Settings className="h-4 w-4" /> Профиль
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {role === "ADMIN" && (
              <Link href={"/dashboard"} className="flex items-center gap-4">
                <LayoutDashboard className="h-4 w-4" />
                Панель управления
              </Link>
            )}
          </DropdownMenuItem>
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
