import { cn } from "~/lib/utils";
import { type IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";

type Props = {
  className?: string;
  icon: IconType | LucideIcon;
};

export const IconLabel = ({ className, icon: Icon }: Props) => {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        className,
      )}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
};
