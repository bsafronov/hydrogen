"use client";

import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type Props = {
  commentId: string;
  authorId: string;
  postId: string;
};

export function PostCommentDelete({ commentId, authorId, postId }: Props) {
  const session = useSession();

  const user = session.data?.user;
  const userId = user?.id;
  const isLoggedIn = session.status === "authenticated";
  const isAdmin = user?.role === "ADMIN";
  const ctx = api.useUtils();

  const { mutate: deleteComment, isLoading } =
    api.postComment.delete.useMutation({
      onSuccess: async () => {
        await ctx.postComment.getManyByPost.invalidate({ postId });
        ctx.post.getManyPublished.setData(undefined, (prev) => {
          return [...(prev ?? [])].map((post) => {
            if (post.id !== postId) return post;

            return {
              ...post,
              _count: {
                ...post._count,
                comments:
                  ctx.postComment.getManyByPost.getData({ postId })?.length ??
                  0,
              },
            };
          });
        });
      },
    });

  const handleDelete = () => {
    deleteComment({
      commentId,
    });
  };

  if (!isLoggedIn) return null;

  if (!isAdmin || userId !== authorId) return null;

  return (
    <button
      className={cn(
        "absolute right-2 top-2 text-muted-foreground opacity-0 hover:text-secondary-foreground group-hover:opacity-50",
      )}
      onClick={handleDelete}
    >
      {!isLoading && <X className="h-4 w-4" />}
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
    </button>
  );
}
