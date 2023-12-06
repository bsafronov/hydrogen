"use client";

import { useEffect, useState } from "react";
import { AdminForm } from "~/app/_components/admin-form";

export function ModalProvider() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AdminForm />
    </>
  );
}
