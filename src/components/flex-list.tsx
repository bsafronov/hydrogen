type Props = {
  children?: React.ReactNode;
};

export function FlexList({ children }: Props) {
  return <ul className="flex flex-wrap gap-2 sm:gap-4">{children}</ul>;
}
