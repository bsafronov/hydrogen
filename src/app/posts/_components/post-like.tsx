"use client";

import { Heart } from "lucide-react";
import { type Session } from "next-auth";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  postId: string;
  likes: RouterOutputs["post"]["getManyPublished"][number]["likes"];
  session: Session | null;
};

export function PostLike({ likes, postId, session }: Props) {
  const hasUserLike = likes.find((like) => like.userId === session?.user.id);
  const ctx = api.useUtils();
  const { mutateAsync: toggleLike } = api.postLike.toggle.useMutation({
    onMutate: ({ postId }) => {
      const userId = session?.user.id;

      if (!userId) return;

      return ctx.post.getManyPublished.setData(undefined, (prev) => {
        return [...(prev ?? [])].map((post) => {
          if (post.id !== postId) return post;

          if (!hasUserLike) {
            return {
              ...post,
              likes: [...post.likes, { userId: session.user.id }],
            };
          }

          return {
            ...post,
            likes: post.likes.filter((like) => like.userId !== userId),
          };
        });
      });
    },
  });

  const handleLike = async () => {
    if (!session?.user.id) return;

    try {
      await toggleLike({ postId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={cn(
        "flex items-center gap-1 gap-1 rounded-full border px-2 py-1 text-xs transition-colors",
        hasUserLike &&
          "border-red-500/30 bg-red-500/20 text-red-500 outline-none focus:outline-none",
      )}
      onClick={handleLike}
    >
      <Heart
        className={cn(
          "h-4 w-4 fill-transparent text-muted-foreground transition-colors",
          hasUserLike && "fill-red-500  text-red-500",
        )}
      />
      {likes.length}
    </button>
  );
}
