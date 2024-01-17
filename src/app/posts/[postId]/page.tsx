import { notFound } from "next/navigation";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Carousel } from "~/components/carousel";
import { Container } from "~/components/container";
import { formatDate } from "~/lib/date";
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

  const { createdAt, fullDescription, link, title, id, images, updatedAt } =
    post;

  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Посты", href: "/posts" },
            { label: title, href: `/posts/${id}` },
          ]}
        />
        <div>
          <div>
            <div className="mb-8 flex flex-col text-center">
              <div className="mb-8 flex flex-col items-end justify-end self-end text-xs text-muted-foreground">
                <span>{formatDate(createdAt)}</span>
                <span>изм. {formatDate(updatedAt)}</span>
              </div>
              <h1 className="mb-2 text-4xl font-extrabold">{post.title}</h1>
              {link && (
                <a href={link} className="text-blue-500">
                  {link}
                </a>
              )}
            </div>
            <Carousel imageURLs={images} sizes="100vw" className="border" />
          </div>
          {fullDescription && (
            <div
              className="prose mx-auto mt-8 w-full grow rounded-md border p-4 dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: fullDescription,
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
