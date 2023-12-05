import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { Greeting } from "./_components/greeting";
import { Avatar } from "./_components/avatar";
import { PreferenceList } from "./_components/preference-list";
import { RecommendationList } from "./_components/recommendation-list";
import { SponsorList } from "./_components/sponsor-list";
import { SkillList } from "./_components/skill-list";
import { Heading } from "~/components/heading";

export default async function Home() {
  return (
    <div>
      <Container>
        <Breadcrumbs items={[{ label: "Главная", href: "/" }]} />
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Greeting />
          <Avatar />
        </div>
        <section className="mt-16">
          <Heading title="Что я умею?" />
          <SkillList />
        </section>
        <section className="mt-16">
          <Heading title="Что мне нравится?" />
          <PreferenceList />
        </section>
        <section className="mt-16">
          <Heading title="Меня любят" />
          <RecommendationList />
        </section>
        <section className="mt-16">
          <Heading title="Спонсоры" />
          <SponsorList />
        </section>
      </Container>
    </div>
  );
}
