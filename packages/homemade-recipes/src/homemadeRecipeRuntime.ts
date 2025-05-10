import type {
  ConditionNames,
  PatternResult,
  RecipeClassNames,
  ResponsiveVariantSelection,
  RuntimeFn,
  VariantGroups,
} from "./types";
import { isObject, mapValues } from "./utils";

const shouldApplyCompound = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
>(
  compoundCheck: ResponsiveVariantSelection<Variants, Conditions>,
  selections: ResponsiveVariantSelection<Variants, Conditions>,
  defaultVariants: ResponsiveVariantSelection<Variants, Conditions>,
) => {
  for (const key of Object.keys(compoundCheck)) {
    if (compoundCheck[key] !== (selections[key] ?? defaultVariants[key])) {
      return false;
    }
  }

  return true;
};

export const homemadeRecipeRuntime = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
>(
  config: PatternResult<Variants, Conditions>,
): RuntimeFn<Variants, Conditions> => {
  const runtimeFn: RuntimeFn<Variants, Conditions> = (options) => {
    let className = config.defaultClassName;

    const selections: ResponsiveVariantSelection<Variants, Conditions> = {
      ...config.defaultVariants,
      ...options,
    };

    for (const variantName in selections) {
      const variantSelection =
        selections[variantName] ?? config.defaultVariants[variantName];

      if (variantSelection != null) {
        let selection = variantSelection;

        if (isObject(selection)) {
          // Conditional style (e.g. fullWidth={ initial: true })

          for (const conditionName in selection) {
            let value = selection[conditionName];

            if (value != null) {
              if (typeof value === "boolean") {
                // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/createRuntimeFn.ts#L42
                value = value === true ? "true" : "false";
              }

              const selectionClassName =
                // @ts-expect-error TODO
                config.responsiveVariantClassNames[conditionName][variantName][
                  value
                ];

              if (selectionClassName) {
                className += " " + selectionClassName;
              }
            }
          }
        } else {
          // Unconditional style (e.g. fullWidth={true})

          if (typeof selection === "boolean") {
            // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/createRuntimeFn.ts#L42
            selection = selection === true ? "true" : "false";
          }

          const selectionClassName =
            // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/createRuntimeFn.ts#L47
            config.variantClassNames[variantName][selection];

          if (selectionClassName) {
            className += " " + selectionClassName;
          }
        }
      }
    }

    for (const [compoundCheck, compoundClassName] of config.compoundVariants) {
      if (
        shouldApplyCompound(compoundCheck, selections, config.defaultVariants)
      ) {
        className += " " + compoundClassName;
      }
    }

    return className;
  };

  runtimeFn.variants = () => Object.keys(config.variantClassNames);

  runtimeFn.classNames = {
    get base() {
      return config.defaultClassName.split(" ")[0];
    },

    get variants() {
      return mapValues(config.variantClassNames, (classNames) =>
        mapValues(classNames, (className) => className.split(" ")[0]),
      ) as RecipeClassNames<Variants, Conditions>["variants"];
    },

    get responsiveVariants() {
      return config.responsiveVariantClassNames;
    },
  };

  runtimeFn.conditions = () => config.conditionNames;

  return runtimeFn;
};
