"use client";

import { LogIn } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useModalStore } from "~/store/modal.store";

export function LoginButton() {
  const toggleLogin = useModalStore((state) => state.toggleLogin);

  return (
    <Button variant={"outline"} size={"icon"} onClick={toggleLogin}>
      <LogIn />
    </Button>
  );
}
