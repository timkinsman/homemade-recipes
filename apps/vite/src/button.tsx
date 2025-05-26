import { buttonRecipe, ButtonVariants } from "./button-recipe.css";

type ButtonProps = ButtonVariants;

export const Button = ({ fullWidth, variant }: ButtonProps) => {
  return (
    <button className={buttonRecipe({ fullWidth, variant })}>
      Hello world
    </button>
  );
};
