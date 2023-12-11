import { redirect } from "next/navigation";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { getServerAuthSession } from "~/server/auth";
import { EditProfileForm } from "./_components/edit-profile-form";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Профиль", href: "/profile" },
        ]}
      />
      <EditProfileForm user={session.user} />
    </Container>
  );
}
