import Link from "next/link";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { GridList } from "~/components/grid-list";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function Page() {
  const posts = await api.post.getMany.query();

  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Панель управления", href: "/dashboard" },
            { label: "Посты", href: "/dashboard/posts" },
          ]}
        />
        <GridList>
          {posts.map((post) => (
            <li key={post.id}>
              <Card className="flex h-full flex-col justify-between">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  {post.shortDescription && (
                    <CardDescription>{post.shortDescription}</CardDescription>
                  )}
                </CardHeader>
                <CardFooter className="justify-between">
                  <Button asChild variant={"outline"}>
                    <Link href={`/dashboard/posts/${post.id}`}>Изменить</Link>
                  </Button>
                  <Badge variant={post.isPublished ? "default" : "destructive"}>
                    {post.isPublished ? "Опубликован" : "Черновик"}
                  </Badge>
                </CardFooter>
              </Card>
            </li>
          ))}
        </GridList>
        <Button asChild className="mt-4">
          <Link href={"/dashboard/posts/new"}>Создать пост</Link>
        </Button>
      </Container>
    </div>
  );
}
