export type ComponentProps<
  E extends React.ElementType,
  Variants = object,
> = Variants &
  React.ComponentProps<E> & {
    asChild?: boolean;
  };
