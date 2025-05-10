import {
  StyleRule,
  generateIdentifier,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { homemadeRecipeRuntime } from "./homemadeRecipeRuntime";
import { injectAdditionalCssRuntime } from "./injectAdditionalCssRuntime";
import type {
  BaseConditions,
  ConditionalOptions,
  CssCache,
  PatternOptions,
  PatternResult,
  ResponsiveVariantClassNames,
  RuntimeFn,
  VariantGroups,
} from "./types";
import { mapValues } from "./utils";

export type {
  RecipeVariants as HomemadeRecipeVariants,
  RuntimeFn,
} from "./types";

/**
 * @param conditions Key/value pairs where the keys become your responsive modifiers, and the values are the min-width where that breakpoint should start.
 * @example
 * const homemadeRecipe = createHomemadeRecipe({
 *  xs: '520px', // Phones (landscape)
 *  sm: '768px', // Tablets (portrait)
 *  md: '1024px', // Tablets (landscape)
 *  lg: '1280px', // Laptops
 *  xl: '1640px', // Desktops
 * })
 */
export const createHomemadeRecipe = <Conditions extends BaseConditions>(
  conditions: ConditionalOptions<Conditions>,
) => {
  const cssCache: CssCache<Conditions> = [];

  function homemadeRecipe<
    Variants extends VariantGroups,
    ConditionNames extends Array<keyof Conditions>,
  >(
    options: PatternOptions<Variants, ConditionNames>,
    debugId?: string,
  ): RuntimeFn<Variants, ConditionNames> {
    const {
      variants = {},
      defaultVariants = {},
      compoundVariants = [],
      base,
      responsiveVariants = [],
    } = options;

    let defaultClassName;

    if (!base || typeof base === "string") {
      const baseClassName = style({});
      defaultClassName = base ? `${baseClassName} ${base}` : baseClassName;
    } else {
      defaultClassName = style(base, debugId);
    }

    // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L36
    const variantClassNames: PatternResult<
      Variants,
      ConditionNames
    >["variantClassNames"] = mapValues(
      variants,
      (variantGroup, variantGroupName) =>
        styleVariants(
          variantGroup,
          (styleRule) =>
            typeof styleRule === "string" ? [styleRule] : styleRule,
          debugId ? `${debugId}_${variantGroupName}` : variantGroupName,
        ),
    );

    const compounds: PatternResult<
      Variants,
      ConditionNames
    >["compoundVariants"] = [];

    for (const { style: theStyle, variants } of compoundVariants) {
      compounds.push([
        variants,
        typeof theStyle === "string"
          ? theStyle
          : style(
              theStyle,
              debugId
                ? `${debugId}_compound_${compounds.length}`
                : `compound_${compounds.length}`,
            ),
      ]);
    }

    // @ts-expect-error TODO
    let conditionClassNames: Omit<
      ResponsiveVariantClassNames<Variants, ConditionNames>,
      "initial"
    > = {};

    if (responsiveVariants !== undefined) {
      responsiveVariants.forEach((responsiveVariant) => {
        if (responsiveVariant === "initial") {
          throw new Error("'initial' is not allowed as a responsiveVariant");
        }

        const breakpoint = conditions[responsiveVariant];

        const styleRuleVariants: Partial<Variants> = {};

        Object.entries(variants).forEach(([variantGroupName, variantGroup]) => {
          // @ts-expect-error TODO
          Object.entries(variantGroup).forEach(([variantName, variant]) => {
            const rules = !Array.isArray(variant) ? [variant] : variant;

            const classList: string[] = [];
            const styleRules: StyleRule[] = [];

            for (const rule of rules) {
              if (typeof rule === "string") {
                classList.push(`${rule}_${String(responsiveVariant)}`);

                if (
                  !cssCache.some(
                    (css) =>
                      css.selector === rule &&
                      css.responsiveVariant === responsiveVariant,
                  )
                ) {
                  // handled in `appendAdditionalCss`
                  cssCache.push({ selector: rule, responsiveVariant });
                }
              } else {
                // styleRules.push(rule);

                styleRules.push({
                  "@media": {
                    [`screen and (min-width: ${breakpoint})`]: rule,
                  },
                });
              }
            }

            if (styleRuleVariants[variantGroupName] === undefined) {
              // @ts-expect-error TODO
              styleRuleVariants[variantGroupName] = {};
            }

            // @ts-expect-error TODO
            styleRuleVariants[variantGroupName][variantName] = [
              ...classList,
              ...styleRules,
            ];
          });
        });

        // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L36
        const variantClassNames: PatternResult<
          Variants,
          ConditionNames
        >["variantClassNames"] = mapValues(
          styleRuleVariants,
          (variantGroup, variantGroupName) =>
            styleVariants(
              variantGroup ?? {},
              (styleRule) => styleRule,
              debugId
                ? `${debugId}_${String(variantGroupName)}_${String(responsiveVariant)}`
                : `${String(variantGroupName)}_${String(responsiveVariant)}`,
            ),
        );

        conditionClassNames = {
          ...conditionClassNames,
          [responsiveVariant]: variantClassNames,
        };
      });
    }

    // @ts-expect-error TODO
    const responsiveVariantClassNames: PatternResult<
      Variants,
      ConditionNames
    >["responsiveVariantClassNames"] = {
      initial: variantClassNames,
      ...conditionClassNames,
    };

    const config: PatternResult<Variants, ConditionNames> = {
      defaultClassName,
      variantClassNames,
      defaultVariants,
      compoundVariants: compounds,
      responsiveVariantClassNames,
      // @ts-expect-error TODO
      conditionNames: responsiveVariants,
    };

    return addFunctionSerializer(homemadeRecipeRuntime(config), {
      importPath: "homemade-recipes/dist/homemadeRecipeRuntime",
      importName: "homemadeRecipeRuntime",
      // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L68
      args: [config],
    });
  }

  const identifier = generateIdentifier();

  function injectAdditionalCss() {
    const config = {
      conditions,
      identifier,
      cssCache,
    };

    return addFunctionSerializer(injectAdditionalCssRuntime(config), {
      importPath: "homemade-recipes/dist/injectAdditionalCssRuntime",
      importName: "injectAdditionalCssRuntime",
      // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L68
      args: [config],
    });
  }

  return { homemadeRecipe, injectAdditionalCss };
};
