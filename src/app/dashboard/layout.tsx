import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
