type Props = {
  title: string;
};

export const Heading = ({ title }: Props) => {
  return (
    <h3 className="mb-4 text-center text-4xl font-bold md:mb-8">{title}</h3>
  );
};
