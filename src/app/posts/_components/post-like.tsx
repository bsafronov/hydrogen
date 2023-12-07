"use client";

import { TRPCClientError } from "@trpc/client";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { useModalStore } from "~/store/modal.store";
import { api } from "~/trpc/react";

type Props = {
  postId: string;
  likesCount: number;
  hasUserLike: boolean;
};

export function PostLike({ postId, hasUserLike, likesCount }: Props) {
  const ctx = api.useUtils();
  const toggleLogin = useModalStore((state) => state.toggleLogin);

  const { mutateAsync: toggleLike, isLoading } =
    api.postLike.toggle.useMutation({
      onSuccess: (res) => {
        if (!res) return;

        ctx.post.getManyPublished.setData(undefined, (prev) => {
          return [...(prev ?? [])].map((post) => {
            if (post.id !== postId) return post;

            return {
              ...post,
              _count: {
                ...post._count,
                likes: res._count.likes,
              },
              likes: res.likes,
            };
          });
        });
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.info("Войдите, пожалуйста!");
          toggleLogin();
        }
      },
    });

  const handleLike = async () => {
    try {
      await toggleLike({ postId });
    } catch (error) {
      if (!(error instanceof TRPCClientError)) {
        return toast.error("Непредвиденная ошибка");
      }
    }
  };

  return (
    <button
      className={cn(
        "flex items-center gap-1 gap-1 rounded-full border px-2 py-1 text-xs outline-none transition-all focus:outline-none",
        hasUserLike && "border-red-500/30 bg-red-500/20 text-red-500 ",
      )}
      disabled={isLoading}
      onClick={handleLike}
    >
      <Heart
        className={cn(
          "h-4 w-4 fill-transparent text-muted-foreground transition-colors",
          hasUserLike && "fill-red-500  text-red-500",
        )}
      />
      <span
        className={cn(
          "absolute pl-6 opacity-100 transition-opacity",
          isLoading && "opacity-0",
        )}
      >
        {likesCount}
      </span>
      <Loader2
        className={cn(
          "h-4 w-4 animate-spin opacity-0 transition-opacity",
          isLoading && "opacity-100",
        )}
      />
    </button>
  );
}
