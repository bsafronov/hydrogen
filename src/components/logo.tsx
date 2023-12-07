import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex flex-col">
        <span className="animate-background-pan bg-gradient-to-r from-sky-600 via-amber-600 via-pink-600 to-sky-600 bg-[size:200%] bg-clip-text text-2xl font-extrabold leading-none text-transparent">
          Hydrogen
        </span>
        <span className="self-end text-xs text-muted-foreground">
          by Safronov
        </span>
      </div>
    </Link>
  );
}
