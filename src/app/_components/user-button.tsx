import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export async function UserButton() {
  const session = await getServerAuthSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full">
        <Image
          src={session?.user.image ?? ""}
          alt="avatar"
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>@{session?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/dashboard"} className="flex items-center gap-4">
            <LayoutDashboard className="h-4 w-4" />
            Панель управления
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
