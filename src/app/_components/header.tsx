import { Container } from "~/components/container";
import { Logo } from "~/components/logo";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { getServerAuthSession } from "~/server/auth";
import { LoginSheet } from "./login-sheet";
import { UserButton } from "./user-button";

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="mb-8 flex h-16 items-center border-b md:mb-16">
      <Container className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {!session && <LoginSheet />}
          {session && <UserButton session={session} />}
        </div>
      </Container>
    </header>
  );
}
