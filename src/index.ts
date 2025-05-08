import { style, StyleRule, styleVariants } from "@vanilla-extract/css";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { createRuntimeFn } from "./createRuntimeFn";
import type {
  BaseConditions,
  PatternOptions,
  PatternResult,
  RuntimeFn,
  VariantGroups,
} from "./types";
import { mapValues } from "./utils";

export type {
  RecipeVariants as HomemadeRecipeVariants,
  RuntimeFn,
} from "./types";

type ConditionalOptions<Conditions extends BaseConditions> = Conditions;

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
      responsiveVariants: conditionNames = [],
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

    const responsiveVariants: PatternResult<
      Variants,
      ConditionNames
    >["responsiveVariants"] = Object.assign(
      { initial: variantClassNames },
      ...conditionNames.map((conditionName) => {
        if (conditionName === "initial") {
          throw new Error("'initial' is not allowed as a condition variant");
        }

        const breakpoint = conditions[conditionName];

        const variantGroupMap: Record<string, Record<string, string>> = {};

        Object.entries(variants as Variants).forEach(
          ([variantGroupName, variantGroup]) => {
            const variantMap: Record<string, string> = {};

            Object.entries(variantGroup).forEach(([variantName, variant]) => {
              let styleRule: StyleRule = normalizeToArray(variant).reduce(
                (acc, curr) => {
                  return { ...acc, ...curr };
                },
                {},
              );

              styleRule = {
                "@media": {
                  [`screen and (min-width: ${breakpoint})`]: styleRule,
                },
              };

              const className = style(
                styleRule,
                debugId
                  ? `${debugId}_${variantGroupName}_${String(variantName)}_${String(conditionName)}`
                  : `${variantGroupName}_${String(variantName)}_${String(conditionName)}`,
              );

              variantMap[variantName] = className;
            });

            variantGroupMap[variantGroupName] = variantMap;
          },
        );

        return { [conditionName]: variantGroupMap };
      }),
    );

    const config: PatternResult<Variants, ConditionNames> = {
      defaultClassName,
      variantClassNames,
      defaultVariants,
      compoundVariants: compounds,
      responsiveVariants,
      conditionNames: conditionNames as ConditionNames,
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

const normalizeToArray = <T>(data: T | T[]): T[] => {
  if (Array.isArray(data)) {
    return [...data];
  }

  return [data];
};
