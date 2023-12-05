import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-1 md:mb-16">
      {items.map((item, index) => (
        <div className="flex items-center gap-1">
          {index !== 0 && <ChevronRight className="h-4 w-4" />}
          <Link
            href={item.href}
            className={cn(
              items.length - 1 !== index && "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
