import { FlexVariants, flexRecipe } from "@/theme/recipes/flex.css";
import { ComponentProps } from "@/types/component-props";
import { extractVariantsFromProps } from "@/utils/extract-variants";
import { mergeClasses } from "@/utils/merge-classes";
import { Slot } from "@radix-ui/react-slot";

const defaultElement = "div";

type FlexProps = ComponentProps<typeof defaultElement, FlexVariants>;

export const Flex = ({ asChild, ...props }: FlexProps) => {
  const [variants, rest] = extractVariantsFromProps(
    props,
    ...flexRecipe.variants(),
  );
  const flex = flexRecipe(variants);
  const Comp = asChild ? Slot : defaultElement;

  return (
    <Comp {...rest} className={mergeClasses(flex, props.className)}>
      {props.children}
    </Comp>
  );
};
