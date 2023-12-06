import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { api } from "~/trpc/server";
import { EditPostForm } from "./_components/edit-post-form";

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
    <Container>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Панель управления", href: "/dashboard" },
          { label: "Посты", href: "/dashboard/posts" },
          { label: post.title, href: `/dashboard/posts/${post.id}` },
        ]}
      />
      <div className="mb-8 flex flex-col items-end justify-end text-xs text-muted-foreground">
        <p className="">
          Создан:{" "}
          {formatRelative(new Date(post.createdAt), new Date(), {
            locale: ru,
          })}
        </p>
        <p>
          Изменён:{" "}
          {formatRelative(new Date(post.updatedAt), new Date(), {
            locale: ru,
          })}
        </p>
      </div>
      <EditPostForm {...post} />
    </Container>
  );
}
