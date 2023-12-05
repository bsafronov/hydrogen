import { cn } from "~/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-4", className)}>
      {children}
    </div>
  );
};
