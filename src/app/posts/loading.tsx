import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { GridList } from "~/components/grid-list";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Посты", href: "/posts" },
        ]}
      />
      <GridList>
        {Array.from(Array(9)).map((_, index) => (
          <li key={index}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton>Заголовок</Skeleton>
                </CardTitle>
                <Skeleton className="">
                  <br />
                  <br />
                  <br />
                </Skeleton>
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video" />
              </CardContent>
              <CardFooter className="items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="text-xs">вчера в 18:26</Skeleton>
              </CardFooter>
            </Card>
          </li>
        ))}
      </GridList>
    </Container>
  );
}
