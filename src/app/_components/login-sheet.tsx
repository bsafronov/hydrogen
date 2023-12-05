"use client";

import { LogIn } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export function LoginSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <LogIn />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Авторизация</SheetTitle>
          <SheetDescription>
            Войдите, чтобы получить доступ ко всем возможностям приложения
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <Button
            onClick={() => signIn("discord")}
            className="gap-4"
            variant={"outline"}
          >
            <FaDiscord className={"h-6 w-6 text-indigo-500"} />
            Войти через Discord
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
