"use client";

import { useEffect, useState } from "react";
import { AdminForm } from "~/app/_components/admin-form";
import { LoginSheet } from "~/app/_components/login-sheet";
import { PostCommentModal } from "~/app/posts/_components/post-comment-modal";

export function ModalProvider() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AdminForm />
      <LoginSheet />
      <PostCommentModal />
    </>
  );
}
