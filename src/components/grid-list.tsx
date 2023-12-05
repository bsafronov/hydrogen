type Props = {
  children?: React.ReactNode;
};

export function GridList({ children }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
