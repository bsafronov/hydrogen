import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
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

      <div>
        <div>
          <div className="mb-8 flex flex-col text-center">
            <div className="mb-8 flex flex-col items-end justify-end self-end text-xs text-muted-foreground">
              <span>
                <Skeleton className="text-transparent">
                  <p>во вторник в 18:26</p>
                  <p>во вторник в 18:26</p>
                </Skeleton>
              </span>
            </div>
            <Skeleton className="mx-auto mb-2 w-fit text-4xl font-extrabold text-transparent">
              Заголовок
            </Skeleton>
            <Skeleton className="mx-auto w-fit text-transparent">
              https://github.com/bsafronov
            </Skeleton>
          </div>
          <Skeleton className="aspect-video w-full" />
        </div>
        <Skeleton className="mx-auto mt-8 h-60 max-w-xl" />
      </div>
    </Container>
  );
}
