"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import PostCommentForm from "./post-comment-form";
import { PostCommentList } from "./post-comment-list";

export function PostCommentModal() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const postId = params.get("comments");

  const { data, isLoading, isError, isSuccess } =
    api.postComment.getManyByPost.useQuery(
      {
        postId: postId!,
      },
      {
        enabled: !!postId,
      },
    );

  return (
    <Dialog open={!!postId} onOpenChange={() => router.push(pathname)}>
      <DialogContent className="block h-full w-full border-y-0 sm:rounded-none">
        <DialogHeader className="mb-8">
          <DialogTitle className="flex items-start gap-2">
            <span>Комментарии</span>
            {isSuccess && (
              <span className="text-xs text-muted-foreground">
                {data?.length}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isError && <p>Что-то пошло не так...</p>}
        {postId && isLoading && <p>Загрузка...</p>}
        {isSuccess && postId && data && (
          <div>
            <PostCommentForm postId={postId} />
            <PostCommentList comments={data} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
