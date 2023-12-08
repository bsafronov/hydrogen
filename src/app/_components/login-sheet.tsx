"use client";

import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useModalStore } from "~/store/modal.store";

export function LoginSheet() {
  const open = useModalStore((state) => state.login);
  const onOpenChange = useModalStore((state) => state.toggleLogin);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-auto">
        <SheetHeader>
          <SheetTitle>Авторизация</SheetTitle>
          <SheetDescription>
            Войдите, чтобы получить доступ ко всем возможностям приложения
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col justify-center gap-4 sm:gap-2">
          <Button
            onClick={() => signIn("discord")}
            className="gap-4"
            variant={"outline"}
          >
            <FaDiscord className={"h-6 w-6 text-indigo-500"} />
            Войти через Discord
          </Button>
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
