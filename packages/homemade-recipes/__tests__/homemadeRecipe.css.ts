import { createHomemadeRecipe } from "../src";

export const homemadeRecipe = createHomemadeRecipe({
  /** Phones (landscape) */
  xs: "520px",
  /** Tablets (portrait) */
  sm: "768px",
  /** Tablets (landscape) */
  md: "1024px",
  /** Laptops */
  lg: "1280px",
  /** Desktops */
  xl: "1640px",
});

export const basic = homemadeRecipe({
  base: {},

  variants: {
    spaceWithDefault: {
      small: {},
      large: {},
    },
    spaceWithoutDefault: {
      small: {},
      large: {},
    },
    color: {
      red: {},
      blue: {},
    },
    rounded: {
      true: { borderRadius: 999 },
    },
  },

  defaultVariants: {
    spaceWithDefault: "small",
  },

  compoundVariants: [
    {
      variants: { color: "red", spaceWithDefault: "small" },
      style: {},
    },
  ],

  responsiveVariants: ["xs", "md", "xl"],
});

export const empty = homemadeRecipe({
  responsiveVariants: ["xs", "md", "xl"],
});

export const definedStringBase = homemadeRecipe({
  base: "definedStringBase",
  variants: {
    variant: {
      simple: "simple-one",
    },
  },
  responsiveVariants: ["xs", "md", "xl"],
});

export const definedStringBaseArray = homemadeRecipe({
  base: ["definedStringBaseInArray_1", "definedStringBaseInArray_2"],
  variants: {
    variant: {
      simple: ["simple-one", "simple-two"],
    },
  },
  responsiveVariants: ["xs", "md", "xl"],
});
