import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";
import { AdminFormButton } from "./admin-form-button";
import { Logout } from "./logout";
import { Dialog } from "~/components/ui/dialog";

export async function UserButton() {
  const session = await getServerAuthSession();

  if (!session) return null;

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
          {role !== "ADMIN" && <AdminFormButton />}
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
