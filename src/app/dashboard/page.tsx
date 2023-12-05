import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";

export default function Page() {
  return (
    <div>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Панель управления", href: "/dashboard" },
          ]}
        />
      </Container>
    </div>
  );
}
