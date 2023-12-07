import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { api } from "~/trpc/server";
import { PostList } from "./_components/post-list";

export default async function Page() {
  const posts = await api.post.getManyPublished.query();

  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Посты", href: "/posts" },
          ]}
        />
        <PostList posts={posts} />
      </Container>
    </div>
  );
}
