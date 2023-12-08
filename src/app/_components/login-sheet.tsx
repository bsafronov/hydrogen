"use client";

import { signIn } from "next-auth/react";
import { FaDiscord, FaGithub, FaYandex } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
        <div className="mt-4 flex flex-col justify-center gap-2">
          <Button
            onClick={() => signIn("google")}
            className="justify-start gap-4"
            variant={"outline"}
          >
            <FcGoogle className={"h-6 w-6"} />
            Войти через Google
          </Button>

          <Button
            onClick={() => signIn("yandex")}
            className="justify-start gap-4"
            variant={"outline"}
          >
            <FaYandex className={"h-6 w-6 text-red-500"} />
            Войти через Yandex
          </Button>
          <Button
            onClick={() => signIn("discord")}
            className="justify-start gap-4"
            variant={"outline"}
          >
            <FaDiscord className={"h-6 w-6 text-indigo-500"} />
            Войти через Discord
          </Button>
          <Button
            onClick={() => signIn("github")}
            className="justify-start gap-4"
            variant={"outline"}
          >
            <FaGithub className={"h-6 w-6"} />
            Войти через Github
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
