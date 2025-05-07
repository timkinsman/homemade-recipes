import type {
  ConditionNames,
  PatternResult,
  RecipeClassNames,
  RuntimeFn,
  VariantGroups,
  VariantSelection,
} from "./types";
import {
  isEmptyObject,
  isNullish,
  isObject,
  mapValues,
  normalizeVariantSelection,
  shallowEqual,
} from "./utils";

const shouldApplyCompound = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
>(
  compoundCheck: VariantSelection<Variants, Conditions>,
  selections: VariantSelection<Variants, Conditions>,
  defaultVariants: VariantSelection<Variants, Conditions>,
) => {
  for (const key of Object.keys(compoundCheck)) {
    const compound = normalizeVariantSelection(compoundCheck[key]);
    let variantSelection = normalizeVariantSelection(selections[key]);

    if (isNullish(variantSelection) || isEmptyObject(variantSelection)) {
      // Nullish or empty conditional

      variantSelection = normalizeVariantSelection(defaultVariants[key]);
    }

    if (isObject(compound) && isObject(variantSelection)) {
      // Conditional styles

      if (!shallowEqual(compound, variantSelection)) {
        return false;
      }
    } else {
      if (compound !== variantSelection) {
        return false;
      }
    }
  }

  return true;
};

export const createRuntimeFn = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
>(
  config: PatternResult<Variants, Conditions>,
): RuntimeFn<Variants, Conditions> => {
  const runtimeFn: RuntimeFn<Variants, Conditions> = (options) => {
    let className = config.defaultClassName;

    const selections: VariantSelection<Variants, Conditions> = {
      ...config.defaultVariants,
      ...options,
    };

    for (const variantName in selections) {
      let variantSelection = normalizeVariantSelection(selections[variantName]);

      if (isNullish(variantSelection) || isEmptyObject(variantSelection)) {
        // Nullish or empty conditional

        variantSelection = config.defaultVariants[variantName];
      }

      if (variantSelection != null) {
        let selection = variantSelection;

        if (isObject(selection)) {
          // Conditional style

          for (const conditionName in selection) {
            let value = selection[conditionName];

            if (value != null) {
              if (typeof value === "boolean") {
                // @ts-expect-error https://github.com/vanilla-extract-css/vanilla-extract/blob/f0db6bfab9d62b97a07a4a049a38573f96ae6d63/packages/recipes/src/createRuntimeFn.ts#L42
                value = value === true ? "true" : "false";
              }

              const selectionClassName =
                // @ts-expect-error TODO
                config.responsiveVariants[conditionName][variantName][value];

              if (selectionClassName) {
                className += " " + selectionClassName;
              }
            }
          }
        } else {
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
      return config.responsiveVariants;
    },
  };

  runtimeFn.conditions = () => config.conditionNames;

  return runtimeFn;
};
