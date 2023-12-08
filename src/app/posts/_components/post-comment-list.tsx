import { type RouterOutputs } from "~/trpc/shared";
import { PostCommentItem } from "./post-comment-item";
import { ScrollArea } from "~/components/ui/scroll-area";

type Props = {
  comments: NonNullable<RouterOutputs["postComment"]["getManyByPost"]>;
};

export function PostCommentList({ comments }: Props) {
  return (
    <ScrollArea className="h-[16rem] grow pr-2">
      <ul className="h-full divide-y">
        {comments.map((item) => (
          <PostCommentItem key={item.id} comment={item} />
        ))}
      </ul>
    </ScrollArea>
  );
}
