import { GridVariants, gridRecipe } from "@/theme/recipes/grid.css";
import { ComponentProps } from "@/types/component-props";
import { mergeClasses } from "@/utils/merge-classes";
import { pick } from "@/utils/pick";
import { Slot } from "@radix-ui/react-slot";

const defaultElement = "div";

type GridProps = ComponentProps<typeof defaultElement, GridVariants>;

export const Grid = ({ asChild, ...props }: GridProps) => {
  const variants = pick(props, ...gridRecipe.variants());
  const grid = gridRecipe(variants);
  const Comp = asChild ? Slot : defaultElement;

  return (
    <Comp {...props} className={mergeClasses(grid, props.className)}>
      {props.children}
    </Comp>
  );
};
