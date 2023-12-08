"use client";

import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type Props = {
  commentId: string;
  likesCount: number;
  hasUserLike: boolean;
  postId: string;
};

export function PostCommentLike({
  commentId,
  likesCount,
  hasUserLike,
  postId,
}: Props) {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";

  const ctx = api.useUtils();
  const { mutate: toggleLike, isLoading } =
    api.postCommentLike.toggle.useMutation({
      onSuccess: (res) => {
        ctx.postComment.getManyByPost.setData({ postId }, (prev) => {
          return [...(prev ?? [])].map((comment) => {
            if (comment.id !== commentId) return comment;

            return {
              ...comment,
              _count: {
                ...comment._count,
                likes: res?._count.likes ?? 0,
              },
              likes: res?.likes ?? [],
            };
          });
        });
      },
    });

  return (
    <button
      className={cn(
        "group/like flex items-center gap-1 text-muted-foreground opacity-50 hover:text-secondary-foreground disabled:hover:text-muted-foreground",
        hasUserLike && "text-red-500 opacity-100 hover:text-red-400",
      )}
      disabled={!isLoggedIn}
      onClick={() => toggleLike({ commentId })}
    >
      {!isLoading && (
        <>
          <Heart
            className={cn(
              "h-4 w-4",
              hasUserLike && "fill-red-500 group-hover/like:fill-red-400",
            )}
          />
          {!!likesCount && (
            <span className={cn("text-xs font-semibold")}>{likesCount}</span>
          )}
        </>
      )}
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
    </button>
  );
}
