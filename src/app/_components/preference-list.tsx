import { GiCardJoker } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { IconLabel } from "~/components/ui/icon-label";

import { Figma, Headphones, Palmtree } from "lucide-react";
import { type IconType } from "react-icons";
import { FaProjectDiagram, FaSmileBeam } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { FlexList } from "~/components/flex-list";
const preferences = [
  {
    title: "Мемы",
    description: "Пришли как-то Лупа и Пупа за зарплатой...",
    icon: (
      <IconLabel
        icon={GiCardJoker as IconType}
        className="bg-emerald-100 text-emerald-700"
      />
    ),
  },
  {
    title: "Удалёнка",
    description: "Извините, а трусы на дейлик надевать обязательно?",
    icon: (
      <IconLabel icon={Palmtree} className="bg-indigo-100 text-indigo-700" />
    ),
  },
  {
    title: "Неформальность",
    description: "Тёплое ламповое общение - гореть должны глаза, а не ж...",
    icon: (
      <IconLabel
        icon={FaSmileBeam as IconType}
        className="bg-sky-100 text-sky-700"
      />
    ),
  },
  {
    title: "Дизайн",
    description: "Чтобы любить, необязательно в него уметь...",
    icon: (
      <IconLabel
        icon={Figma as IconType}
        className="bg-teal-100 text-teal-700"
      />
    ),
  },
  {
    title: "Сложные системы",
    description: "С блекджеком и вычислениями!",
    icon: (
      <IconLabel
        icon={GrSystem as IconType}
        className="bg-purple-100 text-purple-700"
      />
    ),
  },
  {
    title: "Проектирование",
    description:
      "С нуля построю схему БД, сервер и мордочку, а потом потребую аплодисменты.",
    icon: (
      <IconLabel
        icon={FaProjectDiagram as IconType}
        className="bg-fuchsia-100 text-fuchsia-700"
      />
    ),
  },
  {
    title: "Музыка",
    description:
      "Э рон-дон-дон, оооууоуо крезис шнайп дейбл уан ау э шага шаг шага ша зе уан май тайм, гет лоу гет лоу",
    icon: (
      <IconLabel
        icon={Headphones as IconType}
        className="bg-pink-100 text-pink-700"
      />
    ),
  },
  {
    title: "Геймдев",
    description:
      "Когда-то и меня вела дорога приключений, но потом мне пришлось устраиваться на работу...",
    icon: (
      <IconLabel
        icon={IoGameController as IconType}
        className="bg-amber-100 text-amber-700"
      />
    ),
  },
];

export function PreferenceList() {
  return (
    <FlexList>
      {preferences.map(({ description, icon: Icon, title }) => (
        <li key={title} className="grow">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {Icon}
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </FlexList>
  );
}
