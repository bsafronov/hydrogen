"use client";

import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { Heart, Smile } from "lucide-react";
import Image from "next/image";
import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  comment: NonNullable<
    RouterOutputs["postComment"]["getManyByPost"]
  >["comments"][number];
};
export function PostCommentItem({
  comment: {
    createdAt,
    description,
    user: { image, name },
  },
}: Props) {
  return (
    <li className="flex items-start gap-2 py-2">
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
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span>0</span>
          </div>
        </div>
      </div>
    </li>
  );
}
