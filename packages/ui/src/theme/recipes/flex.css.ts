import { HomemadeRecipeVariants } from "homemade-recipes";
import { homemadeRecipe } from "../homemade-recipe.css";
import { theme } from "../theme.css";

export const flexRecipe = homemadeRecipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
  },

  variants: {
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
      rowReverse: {
        flexDirection: "row-reverse",
      },
      columnReverse: {
        flexDirection: "column-reverse",
      },
    },
    gap: {
      "1": {
        gap: theme.space[1],
      },
      "2": {
        gap: theme.space[2],
      },
      "3": {
        gap: theme.space[3],
      },
      "4": {
        gap: theme.space[4],
      },
      "5": {
        gap: theme.space[5],
      },
      "6": {
        gap: theme.space[6],
      },
      "7": {
        gap: theme.space[7],
      },
      "8": {
        gap: theme.space[8],
      },
      "9": {
        gap: theme.space[9],
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
    },
    wrap: {
      noWrap: {
        flexWrap: "nowrap",
      },
      wrap: {
        flexWrap: "wrap",
      },
      wrapReverse: {
        flexWrap: "wrap-reverse",
      },
    },
  },

  responsiveVariants: ["xs", "sm", "md", "lg", "xl"],

  defaultVariants: {
    align: "stretch",
    direction: "row",
    justify: "start",
    wrap: "noWrap",
  },
});

export type FlexVariants = NonNullable<
  HomemadeRecipeVariants<typeof flexRecipe>
>;
