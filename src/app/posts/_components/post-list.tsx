"use client";

import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import { PostItem } from "./post-item";
import { GridList } from "~/components/grid-list";

type Props = {
  posts: RouterOutputs["post"]["getManyPublished"];
};

export function PostList({ posts }: Props) {
  const { data: clientPosts } = api.post.getManyPublished.useQuery(undefined, {
    initialData: posts,
  });

  return (
    <GridList>
      {clientPosts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </GridList>
  );
}
