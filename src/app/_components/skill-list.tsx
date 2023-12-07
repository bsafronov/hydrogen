import { FlexList } from "~/components/flex-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const skills = [
  {
    title: "Стайлинг",
    description: (
      <ul className="list-disc pl-4">
        <li>БЭМ</li>
        <li>SCSS</li>
        <li>Tailwind 🤩</li>
        <li>CSS in JS</li>
      </ul>
    ),
  },
  {
    title: "Морда",
    description: (
      <ul className="list-disc pl-4">
        <li>TypeScript 🤩</li>
        <li>Next.js 🤩</li>
        <li>React</li>
      </ul>
    ),
  },
  {
    title: "Сервер",
    description: (
      <div className="flex divide-x">
        <ul className="grow list-disc px-4">
          <li>Express.js</li>
          <li>Nest.js</li>
          <li>Next.js 🤩</li>
          <li>TRPC 🤩</li>
        </ul>
        <div className="px-4">
          <p>С БД общаюсь через ОРМ.</p>
          <p>Люблю Prisma 🤗</p>
        </div>
      </div>
    ),
  },
];

export function SkillList() {
  return (
    <FlexList>
      {skills.map(({ title, description }) => (
        <li key={title} className="grow">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {description}
            </CardContent>
          </Card>
        </li>
      ))}
    </FlexList>
  );
}
