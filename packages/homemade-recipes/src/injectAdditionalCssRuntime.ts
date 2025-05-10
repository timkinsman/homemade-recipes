import { createSheet, getStyle } from "./sheet";
import type { BaseConditions, ConditionalOptions, CssCache } from "./types";

export const injectAdditionalCssRuntime = <
  Conditions extends BaseConditions,
>(config: {
  conditions: ConditionalOptions<Conditions>;
  identifier: string;
  cssCache: CssCache<Conditions>;
}) => {
  const runtimeFn = () => {
    if (typeof window === "undefined") {
      throw Error("`appendAdditionalCss only works in Client Components.");
    }

    const sheet = createSheet(config.identifier);

    config.cssCache.forEach((css) => {
      const propStr = getStyle(css.selector);

      if (propStr === undefined) {
        return console.warn("CSS class not found:", css.selector);
      }

      const breakpoint = config.conditions[css.responsiveVariant];

      sheet.insertRule(
        `@media screen and (min-width: ${breakpoint}) {.${css.selector}_${String(css.responsiveVariant)}{${propStr}}}`,
        sheet.cssRules.length,
      );
    });

    return sheet;
  };

  return runtimeFn();
};
