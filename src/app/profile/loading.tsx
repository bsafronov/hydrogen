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
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-64 w-64 rounded-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 px-4">Загрузить фото</Skeleton>
            <Skeleton className="h-10 px-4">Удалить фото</Skeleton>
          </div>
        </div>
        <div className="grow">
          <div className="space-y-2">
            <Skeleton>Отображаемое имя</Skeleton>
            <Skeleton className="h-10" />
            <Skeleton className="text-sm">
              Имя, которое будет отображаться под комментариями:
            </Skeleton>
            <Skeleton className="text-sm">
              Оставьте пустым, если хотите быть анонимными.
            </Skeleton>
          </div>
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-10 px-4">Сохранить</Skeleton>
          </div>
        </div>
      </div>
    </Container>
  );
}
