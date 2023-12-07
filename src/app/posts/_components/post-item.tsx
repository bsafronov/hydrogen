import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { LinkIcon } from "lucide-react";
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
import { type RouterOutputs } from "~/trpc/shared";
import { PostLike } from "./post-like";
import { PostComment } from "./post-comment";

type Props = {
  post: RouterOutputs["post"]["getManyPublished"][number];
};

export function PostItem({
  post: { id, title, shortDescription, link, images, likes, createdAt, _count },
}: Props) {
  return (
    <li>
      <Card className="flex h-full flex-col">
        <CardHeader className="grow">
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
        <CardContent>
          <Carousel imageURLs={images} />
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
