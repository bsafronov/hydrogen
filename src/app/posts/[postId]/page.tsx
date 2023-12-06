import { notFound } from "next/navigation";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { api } from "~/trpc/server";

type Props = {
  params: {
    postId: string;
  };
};
export default async function Page({ params: { postId } }: Props) {
  const post = await api.post.getOne.query({ id: postId });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Посты", href: "/posts" },
            { label: post.title, href: `/posts/${postId}` },
          ]}
        />
      </Container>
    </div>
  );
}
