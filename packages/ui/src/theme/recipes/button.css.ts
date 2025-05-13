import { HomemadeRecipeVariants } from "homemade-recipes";
import { homemadeRecipe } from "../homemade-recipe.css";
import { theme } from "../theme.css";

export const buttonRecipe = homemadeRecipe({
  base: {
    all: "unset",
    alignItems: "center",
    boxSizing: "border-box",
    userSelect: "none",

    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",

    fontFamily: theme.fonts.text,
    fontWeight: theme.fontWeights.medium,
    fontVariantNumeric: "tabular-nums",

    transition: "all 100ms",

    selectors: {
      "&::before": {
        boxSizing: "border-box",
      },
      "&::after": {
        boxSizing: "border-box",
      },
      "&:hover": {
        cursor: "pointer",
      },
      "&:disabled": {
        backgroundColor: theme.colors.slate.slate2,
        boxShadow: `inset 0 0 0 1px ${theme.colors.slateA.slateA7}`,
        color: theme.colors.slate.slate8,
        cursor: "not-allowed",
        pointerEvents: "none",
      },
    },
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: "unset",
      },
    },
    loading: {
      true: {
        color: "transparent !important",
      },
    },
    size: {
      "1": {
        borderRadius: theme.radii[1],
        height: theme.sizes[5],
        paddingLeft: theme.space[2],
        paddingRight: theme.space[2],
        fontSize: theme.fontSizes[1],
        lineHeight: theme.sizes[5],
      },
      "2": {
        borderRadius: theme.radii[2],
        height: theme.sizes[6],
        paddingLeft: theme.space[3],
        paddingRight: theme.space[3],
        fontSize: theme.fontSizes[3],
        lineHeight: theme.lineHeights[6],
      },
      "3": {
        borderRadius: theme.radii[2],
        height: theme.sizes[7],
        paddingLeft: theme.space[4],
        paddingRight: theme.space[4],
        fontSize: theme.fontSizes[4],
        lineHeight: theme.sizes[7],
      },
    },
    variant: {
      primary: {
        backgroundColor: theme.colors.violet.violet4,
        color: theme.colors.violet.violet11,

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.violet.violet5,
          },
          "&:active": {
            backgroundColor: theme.colors.violet.violet6,
          },
        },
      },
      secondary: {
        backgroundColor: theme.colors.cyan.cyan4,
        color: theme.colors.cyan.cyan11,

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.cyan.cyan5,
          },
          "&:active": {
            backgroundColor: theme.colors.cyan.cyan6,
          },
        },
      },
      outline: {
        backgroundColor: "transparent",
        boxShadow: `inset 0 0 0 1px ${theme.colors.slateA.slateA4}`,

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.slateA.slateA3,
          },
          "&:active": {
            backgroundColor: theme.colors.slateA.slateA4,
          },
        },
      },
      ghost: {
        backgroundColor: "transparent",

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.slateA.slateA3,
          },
          "&:active": {
            backgroundColor: theme.colors.slateA.slateA4,
          },
        },
      },
      error: {
        backgroundColor: theme.colors.ruby.ruby4,
        color: theme.colors.ruby.ruby11,

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.ruby.ruby5,
          },
          "&:active": {
            backgroundColor: theme.colors.ruby.ruby6,
          },
        },
      },
      success: {
        backgroundColor: theme.colors.green.green4,
        color: theme.colors.green.green11,

        selectors: {
          "&:hover": {
            backgroundColor: theme.colors.green.green5,
          },
          "&:active": {
            backgroundColor: theme.colors.green.green6,
          },
        },
      },
    },
    round: {
      true: {
        borderRadius: theme.radii.full,
      },
    },
  },

  responsiveVariants: ["sm"],

  defaultVariants: {
    size: "2",
    variant: "primary",
  },
});

// Get the type
export type ButtonVariants = HomemadeRecipeVariants<typeof buttonRecipe>;
