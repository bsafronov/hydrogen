"use client";

import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { Smile } from "lucide-react";
import Image from "next/image";
import { type RouterOutputs } from "~/trpc/shared";
import { PostCommentDelete } from "./post-comment-delete";
import { PostCommentLike } from "./post-comment-like";

type Props = {
  comment: NonNullable<RouterOutputs["postComment"]["getManyByPost"]>[number];
};
export function PostCommentItem({
  comment: {
    id,
    postId,
    userId,
    createdAt,
    description,
    _count,
    likes,
    user: { image, name },
  },
}: Props) {
  return (
    <li className="group relative flex items-start gap-2 py-2">
      {image && (
        <Image
          src={image}
          alt={`${name} avatar`}
          width={48}
          height={48}
          className="rounded-full border"
        />
      )}
      {!image && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border">
          <Smile className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div className="flex w-full flex-col text-sm">
        {name && <span className="text-xs text-muted-foreground">@{name}</span>}
        {!name && <span className="text-xs text-muted-foreground">Аноним</span>}
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatRelative(new Date(createdAt), new Date(), { locale: ru })}
          </span>
          <PostCommentLike
            postId={postId}
            commentId={id}
            likesCount={_count.likes}
            hasUserLike={!!likes.length}
          />
        </div>
      </div>
      <PostCommentDelete commentId={id} authorId={userId} postId={postId} />
    </li>
  );
}
