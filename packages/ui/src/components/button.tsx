import { ButtonVariants, buttonRecipe } from "@/theme/recipes/button.css";
import { ComponentProps } from "@/types/component-props";
import { mergeClasses } from "@/utils/merge-classes";
import { pick } from "@/utils/pick";
import { Slot } from "@radix-ui/react-slot";

const defaultElement = "button";

export type ButtonProps = ComponentProps<typeof defaultElement, ButtonVariants>;

export const Button = ({ asChild, ...props }: ButtonProps) => {
  const variants = pick(props, ...buttonRecipe.variants());
  const button = buttonRecipe(variants);
  const Comp = asChild ? Slot : defaultElement;

  return (
    <Comp {...props} className={mergeClasses(button, props.className)}>
      {props.children}
    </Comp>
  );
};
