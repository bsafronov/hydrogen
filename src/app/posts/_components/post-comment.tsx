"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

type Props = {
  commentCount: number;
  postId: string;
};

export function PostComment({ commentCount, postId }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={{ pathname, query: { comments: postId } }}
      className={cn(
        "flex items-center gap-1 gap-1 rounded-full border px-4 py-1 pl-2 text-xs transition-all",
      )}
    >
      <MessageCircle className="h-4 w-4 text-muted-foreground" />
      {commentCount}
    </Link>
  );
}
