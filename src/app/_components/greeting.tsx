import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Greeting() {
  return (
    <div className="max-w-lg">
      <h5 className="text-5xl font-bold">Привет! 🖐️</h5>
      <br />
      <p>
        Меня зовут Богдан, и я <span className="line-through">алкоголик</span>{" "}
        Fullstack-разработчик.
      </p>
      <br />
      <p>
        Занимаюсь разработкой 2 года. Пишу на{" "}
        <span className="animate-background-pan bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-[size:200%] bg-clip-text text-lg font-extrabold leading-none text-transparent">
          React
        </span>{" "}
        и{" "}
        <span className="animate-background-pan bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-[size:200%] bg-clip-text text-lg font-extrabold leading-none text-transparent">
          Typescript
        </span>
        .
      </p>
      <p>
        У меня есть принципы. Если мои принципы вам не подходят, у меня есть
        другие.
      </p>
      <br />
      <Button asChild>
        <Link href={"/posts"}>Насладиться работами 😍</Link>
      </Button>
    </div>
  );
}
