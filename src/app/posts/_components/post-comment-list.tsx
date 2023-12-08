import { type RouterOutputs } from "~/trpc/shared";
import { PostCommentItem } from "./post-comment-item";

type Props = {
  comments: NonNullable<RouterOutputs["postComment"]["getManyByPost"]>;
};

export function PostCommentList({ comments }: Props) {
  return (
    <ul className="divide-y">
      {comments.map((item) => (
        <PostCommentItem key={item.id} comment={item} />
      ))}
    </ul>
  );
}
