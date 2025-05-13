import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { theme } from "../theme.css";

const responsiveProperties = defineProperties({
  // https://www.radix-ui.com/themes/docs/theme/breakpoints
  conditions: {
    /** Phones (portrait) */
    initial: {},
    /** Phones (landscape) */
    xs: { "@media": "screen and (min-width: 520px)" },
    /** Tablets (portrait) */
    sm: { "@media": "screen and (min-width: 768px)" },
    /** Tablets (landscape) */
    md: { "@media": "screen and (min-width: 1024px)" },
    /** Laptops */
    lg: { "@media": "screen and (min-width: 1280px)" },
    /** Desktops */
    xl: { "@media": "screen and (min-width: 1640px)" },
  },
  defaultCondition: "initial",
  properties: {
    display: ["block", "flex", "initial", "none"],
    marginTop: theme.space,
    marginBottom: theme.space,
    marginLeft: theme.space,
    marginRight: theme.space,
    order: [-1, "unset"],
    paddingTop: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
  },
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
