import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { LinkIcon, Star } from "lucide-react";
import Link from "next/link";
import { Carousel } from "~/components/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type RouterOutputs } from "~/trpc/shared";
import { PostComment } from "./post-comment";
import { PostLike } from "./post-like";

type Props = {
  post: RouterOutputs["post"]["getManyPublished"][number];
};

export function PostItem({
  post: {
    id,
    title,
    shortDescription,
    link,
    images,
    likes,
    createdAt,
    _count,
    isFeatured,
    tags,
  },
}: Props) {
  return (
    <li>
      <Card className="relative flex h-full flex-col">
        {isFeatured && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Star className="absolute right-6 top-6 fill-yellow-400 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent align="end">
                Автор гордится этим проектом
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <CardHeader>
          <CardTitle>
            <Link
              href={`/posts/${id}`}
              className="flex items-start gap-2 hover:underline"
            >
              {title}
              <LinkIcon className="h-4 w-4 text-blue-500" />
            </Link>
          </CardTitle>
          <CardDescription>
            {shortDescription}
            <br />
            {link && (
              <a href={link} className="text-blue-500" target="_blank">
                {link}
              </a>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex grow flex-col justify-end">
          <ul className="mb-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="rounded-full border bg-muted px-2 text-xs"
              >
                #{tag}
              </li>
            ))}
          </ul>
          <Carousel imageURLs={images} className="w-full" />
        </CardContent>
        <CardFooter className="items-center justify-between">
          <div className="flex items-center gap-2">
            <PostLike
              likesCount={_count.likes}
              hasUserLike={!!likes.length}
              postId={id}
            />
            <PostComment commentCount={_count.comments} postId={id} />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatRelative(new Date(createdAt), new Date(), { locale: ru })}
          </span>
        </CardFooter>
      </Card>
    </li>
  );
}
