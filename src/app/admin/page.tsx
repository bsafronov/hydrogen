import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { GetAdminForm } from "./_components/get-admin-form";

export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Админка", href: "/admin" },
        ]}
      />
      <GetAdminForm />
    </Container>
  );
}
