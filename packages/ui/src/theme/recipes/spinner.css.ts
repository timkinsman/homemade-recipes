import { spin } from "@/theme/animations/spin.css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { theme } from "../theme.css";

export const spinnerRecipe = recipe({
  base: {
    animation: `${spin} .8s linear infinite`,
    border: `1px solid ${theme.colors.slate.slate4}`,
    borderRadius: theme.radii.round,
    borderTop: "1px solid currentColor",
  },

  variants: {
    size: {
      "1": {
        height: theme.sizes[1],
        width: theme.sizes[1],
      },
      "2": {
        height: theme.sizes[2],
        width: theme.sizes[2],
      },
      "3": {
        height: theme.sizes[3],
        width: theme.sizes[3],
      },
      "4": {
        height: theme.sizes[4],
        width: theme.sizes[4],
      },
      "5": {
        height: theme.sizes[5],
        width: theme.sizes[5],
      },
      "6": {
        height: theme.sizes[6],
        width: theme.sizes[6],
      },
      "7": {
        height: theme.sizes[7],
        width: theme.sizes[7],
      },
      "8": {
        height: theme.sizes[8],
        width: theme.sizes[8],
      },
      "9": {
        height: theme.sizes[9],
        width: theme.sizes[9],
      },
    },
  },

  defaultVariants: {
    size: "3",
  },
});

// Get the type
export type SpinnerVariants = RecipeVariants<typeof spinnerRecipe>;
