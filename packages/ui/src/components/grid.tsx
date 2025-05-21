import { GridVariants, gridRecipe } from "@/theme/recipes/grid.css";
import { ComponentProps } from "@/types/component-props";
import { extractVariantsFromProps } from "@/utils/extract-variants";
import { mergeClasses } from "@/utils/merge-classes";
import { Slot } from "@radix-ui/react-slot";

const defaultElement = "div";

type GridProps = ComponentProps<typeof defaultElement, GridVariants>;

export const Grid = ({ asChild, ...props }: GridProps) => {
  const [variants, rest] = extractVariantsFromProps(
    props,
    ...gridRecipe.variants(),
  );
  const grid = gridRecipe(variants);
  const Comp = asChild ? Slot : defaultElement;

  return (
    <Comp {...rest} className={mergeClasses(grid, props.className)}>
      {props.children}
    </Comp>
  );
};
