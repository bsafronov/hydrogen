"use client";

import { GridList } from "~/components/grid-list";
import { type RouterOutputs } from "~/trpc/shared";
import { PostItem } from "./post-item";
import { api } from "~/trpc/react";
import { type Session } from "next-auth";

type Props = {
  posts: RouterOutputs["post"]["getManyPublished"];
  session: Session | null;
};

export function PostList({ posts, session }: Props) {
  const { data: clientPosts } = api.post.getManyPublished.useQuery(undefined, {
    initialData: posts,
  });

  return (
    <GridList>
      {clientPosts.map((post) => (
        <PostItem post={post} key={post.id} session={session} />
      ))}
    </GridList>
  );
}
