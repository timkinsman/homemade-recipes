import { FlexVariants, flexRecipe } from "@/theme/recipes/flex.css";
import { ComponentProps } from "@/types/component-props";
import { mergeClasses } from "@/utils/merge-classes";
import { pick } from "@/utils/pick";
import { Slot } from "@radix-ui/react-slot";

const defaultElement = "div";

type FlexProps = ComponentProps<typeof defaultElement, FlexVariants>;

export const Flex = ({ asChild, ...props }: FlexProps) => {
  const variants = pick(props, ...flexRecipe.variants());
  const flex = flexRecipe(variants);
  const Comp = asChild ? Slot : defaultElement;

  return (
    <Comp {...props} className={mergeClasses(flex, props.className)}>
      {props.children}
    </Comp>
  );
};
