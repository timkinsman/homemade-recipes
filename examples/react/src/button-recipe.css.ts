import { HomemadeRecipeVariants } from "homemade-recipes";
import { homemadeRecipe } from "./homemade-recipes.css";

export const buttonRecipe = homemadeRecipe({
  base: {
    borderRadius: 6,
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: "initial",
      },
    },
  },

  responsiveVariants: ["sm"],
});

export type ButtonVariants = NonNullable<
  HomemadeRecipeVariants<typeof buttonRecipe>
>;
