import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { api } from "~/trpc/server";
import { PostList } from "./_components/post-list";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
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
        <PostList posts={posts} session={session} />
      </Container>
    </div>
  );
}
