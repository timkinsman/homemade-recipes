import { HomemadeRecipeVariants } from "homemade-recipes";
import { homemadeRecipe } from "../homemade-recipe.css";
import { theme } from "../theme.css";

export const gridRecipe = homemadeRecipe({
  base: {
    boxSizing: "border-box",
    display: "grid",
  },

  variants: {
    align: {
      start: {
        alignItems: "start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    columns: {
      "1": {
        gridTemplateColumns: `repeat(1, minmax(0, 1fr))`,
      },
      "2": {
        gridTemplateColumns: `repeat(2, minmax(0, 2fr))`,
      },
      "3": {
        gridTemplateColumns: `repeat(3, minmax(0, 3fr))`,
      },
      "4": {
        gridTemplateColumns: `repeat(4, minmax(0, 4fr))`,
      },
      "5": {
        gridTemplateColumns: `repeat(5, minmax(0, 5fr))`,
      },
      "6": {
        gridTemplateColumns: `repeat(6, minmax(0, 6fr))`,
      },
      "7": {
        gridTemplateColumns: `repeat(7, minmax(0, 7fr))`,
      },
      "8": {
        gridTemplateColumns: `repeat(8, minmax(0, 8fr))`,
      },
      "9": {
        gridTemplateColumns: `repeat(9, minmax(0, 9fr))`,
      },
      "10": {
        gridTemplateColumns: `repeat(10, minmax(0, 10fr))`,
      },
    },

    flow: {
      row: {
        gridAutoFlow: "row",
      },
      column: {
        gridAutoFlow: "column",
      },
      dense: {
        gridAutoFlow: "dense",
      },
      rowDense: {
        gridAutoFlow: "row dense",
      },
      columnDense: {
        gridAutoFlow: "column dense",
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
    gapX: {
      "1": {
        columnGap: theme.space[1],
      },
      "2": {
        columnGap: theme.space[2],
      },
      "3": {
        columnGap: theme.space[3],
      },
      "4": {
        columnGap: theme.space[4],
      },
      "5": {
        columnGap: theme.space[5],
      },
      "6": {
        columnGap: theme.space[6],
      },
      "7": {
        columnGap: theme.space[7],
      },
      "8": {
        columnGap: theme.space[8],
      },
      "9": {
        columnGap: theme.space[9],
      },
    },
    gapY: {
      "1": {
        rowGap: theme.space[1],
      },
      "2": {
        rowGap: theme.space[2],
      },
      "3": {
        rowGap: theme.space[3],
      },
      "4": {
        rowGap: theme.space[4],
      },
      "5": {
        rowGap: theme.space[5],
      },
      "6": {
        rowGap: theme.space[6],
      },
      "7": {
        rowGap: theme.space[7],
      },
      "8": {
        rowGap: theme.space[8],
      },
      "9": {
        rowGap: theme.space[9],
      },
    },
    justify: {
      start: {
        justifyContent: "start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "end",
      },
      between: {
        justifyContent: "space-between",
      },
    },
    rows: {
      "1": {
        gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
      },
      "2": {
        gridTemplateRows: `repeat(2, minmax(0, 2fr))`,
      },
      "3": {
        gridTemplateRows: `repeat(3, minmax(0, 3fr))`,
      },
      "4": {
        gridTemplateRows: `repeat(4, minmax(0, 4fr))`,
      },
      "5": {
        gridTemplateRows: `repeat(5, minmax(0, 5fr))`,
      },
      "6": {
        gridTemplateRows: `repeat(6, minmax(0, 6fr))`,
      },
      "7": {
        gridTemplateRows: `repeat(7, minmax(0, 7fr))`,
      },
      "8": {
        gridTemplateRows: `repeat(8, minmax(0, 8fr))`,
      },
      "9": {
        gridTemplateRows: `repeat(9, minmax(0, 9fr))`,
      },
      "10": {
        gridTemplateRows: `repeat(10, minmax(0, 10fr))`,
      },
    },
  },

  responsiveVariants: ["xs", "sm", "md", "lg", "xl"],

  defaultVariants: {},
});

export type GridVariants = NonNullable<
  HomemadeRecipeVariants<typeof gridRecipe>
>;
