import Link from "next/link";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { Button } from "~/components/ui/button";

export default async function Page() {
  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Панель управления", href: "/dashboard" },
          ]}
        />
        <Button asChild>
          <Link href={"/dashboard/posts"}>Мои посты</Link>
        </Button>
      </Container>
    </div>
  );
}
