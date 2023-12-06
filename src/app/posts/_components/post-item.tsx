import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
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
import { type Session } from "next-auth";
import { LinkIcon } from "lucide-react";

type Props = {
  post: RouterOutputs["post"]["getManyPublished"][number];
  session: Session | null;
};

export function PostItem({
  post: { id, title, shortDescription, link, images, likes, createdAt },
  session,
}: Props) {
  return (
    <li>
      <Card>
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
            <PostLike likes={likes} postId={id} session={session} />
            {/* <button
              className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
            >
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              {_count.comments}
            </button> */}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatRelative(new Date(createdAt), new Date(), { locale: ru })}
          </span>
        </CardFooter>
      </Card>
    </li>
  );
}
