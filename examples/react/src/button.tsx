import { buttonRecipe, ButtonVariants } from "./button-recipe.css";

type ButtonProps = ButtonVariants;

export const Button = ({ fullWidth }: ButtonProps) => {
  return <button className={buttonRecipe({ fullWidth })}>Hello world</button>;
};
