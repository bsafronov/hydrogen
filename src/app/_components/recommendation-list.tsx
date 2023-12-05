import { Smile } from "lucide-react";
import { GridList } from "~/components/grid-list";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

const recommendations = [
  {
    name: "Александр",
    role: "начальник",
    message: "Кто его сюда взял? 🤔",
  },
  {
    name: "Евпат",
    role: "заказчик",
    message: "Прекрасная работа, ставлю лайки и подписываюсь 🤩",
  },
  {
    name: "Настя",
    role: "коллега",
    message: "Ты можешь не петь?",
  },
  {
    name: "Серёга",
    role: "лучшийдруг",
    message: "Ты такой кадр, это п... 🤡",
  },
  {
    name: "Олег",
    role: "бездомный",
    message: "Отличный парень, благослови его, господи 🙏",
  },
  {
    name: "Nagibator2000",
    role: "тиммейтывигре",
    message: "Заберите у него компьютер 🤬",
  },
  {
    name: "Светлана",
    role: "мама",
    message: "Отличный сыночка корзиночка, рекомендую 👍",
  },
  {
    name: "Тамара",
    role: "бабушка",
    message: "Доброе утро! 😘😘😘 Отличного дня желаю!!! 🤑🤑🤠🥳🥳🙏",
  },
];

export function RecommendationList() {
  return (
    <GridList>
      {recommendations.map((item) => (
        <li key={item.role}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <Smile className="text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="leading-none">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    #{item.role}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>{item.message}</CardContent>
          </Card>
        </li>
      ))}
    </GridList>
  );
}
