import { style, styleVariants } from "@vanilla-extract/css";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { createRuntimeFn } from "./createRuntimeFn";
import type {
  BaseConditions,
  ConditionalOptions,
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

        // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L36
        const variantClassNames: PatternResult<
          Variants,
          ConditionNames
        >["variantClassNames"] = mapValues(
          variants,
          (variantGroup, variantGroupName) =>
            styleVariants(
              variantGroup,
              (styleRule) => ({
                // @ts-expect-error TODO
                "@media": {
                  [`screen and (min-width: ${breakpoint})`]:
                    typeof styleRule === "string" ? [styleRule] : styleRule,
                },
              }),
              debugId
                ? `${debugId}_${variantGroupName}_${String(responsiveVariant)}`
                : `${variantGroupName}_${String(responsiveVariant)}`,
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

    return addFunctionSerializer(createRuntimeFn(config), {
      importPath: "homemade-recipes/dist/createRuntimeFn",
      importName: "createRuntimeFn",
      // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/index.ts#L68
      args: [config],
    });
  }

  return homemadeRecipe;
};
