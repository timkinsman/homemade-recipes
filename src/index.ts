import { StyleRule, style, styleVariants } from "@vanilla-extract/css";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { createRuntimeFn } from "./createRuntimeFn";
import type {
  BaseConditions,
  PatternOptions,
  PatternResult,
  RuntimeFn,
  VariantGroups,
  VariantSelection,
} from "./types";
import { mapValues } from "./utils";

export type {
  RecipeVariants as HomemadeRecipeVariants,
  RuntimeFn,
} from "./types";

type ConditionalOptions<Conditions extends BaseConditions> = Conditions;

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
      conditionVariants: conditionNames = [],
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

    const compounds: Array<
      [VariantSelection<Variants, ConditionNames>, string]
    > = [];

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

    const conditionVariants: PatternResult<
      Variants,
      ConditionNames
    >["conditionVariants"] = Object.assign(
      { initial: variantClassNames },
      ...conditionNames.map((conditionName) => {
        if (conditionName === "initial") {
          throw new Error("'initial' is not allowed as a condition variant");
        }

        const condition = conditions[conditionName];

        const variantGroupMap: Record<
          string | number,
          Record<string | number, string>
        > = {};

        Object.entries(variants).forEach(([variantGroupName, variantGroup]) => {
          const variantMap: Record<string | number, string> = {};

          Object.entries(variantGroup as Record<string, object>).forEach(
            ([variantName, variant]) => {
              let styleValue: StyleRule = variant;

              styleValue = {
                "@media": {
                  [condition]: variant,
                },
              };

              const className = style(
                styleValue,
                debugId
                  ? `${debugId}_${variantGroupName}_${String(variantName)}_${String(conditionName)}`
                  : `${variantGroupName}_${String(variantName)}_${String(conditionName)}`,
              );

              variantMap[variantName] = className;
            },
          );

          variantGroupMap[variantGroupName] = variantMap;
        });

        return { [conditionName]: variantGroupMap };
      }),
    );

    const config: PatternResult<Variants, ConditionNames> = {
      defaultClassName,
      variantClassNames,
      defaultVariants,
      compoundVariants: compounds,
      conditionVariants,
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
