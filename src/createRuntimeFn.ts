import type {
  ConditionNames,
  PatternResult,
  RecipeClassNames,
  RuntimeFn,
  VariantGroups,
  VariantSelection,
} from "./types";
import { mapValues } from "./utils";

const shouldApplyCompound = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
>(
  compoundCheck: VariantSelection<Variants, Conditions>,
  selections: VariantSelection<Variants, Conditions>,
  defaultVariants: VariantSelection<Variants, Conditions>,
  conditionName: "initial" | Conditions[number],
) => {
  for (const key of Object.keys(compoundCheck)) {
    const value = selections[key] ?? defaultVariants[key];

    if (typeof value === "object") {
      // Conditional style

      if (compoundCheck[key] !== value[conditionName]) {
        return false;
      }
    } else {
      // Unconditional style

      if (conditionName !== "initial" || compoundCheck[key] !== value) {
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
      const variantSelection =
        selections[variantName] ?? config.defaultVariants[variantName];

      if (variantSelection != null) {
        let selection = variantSelection;

        if (typeof selection === "object") {
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

    for (const [
      compoundCheck,
      compoundClassName,
      conditionName,
    ] of config.compoundVariants) {
      if (
        shouldApplyCompound(
          compoundCheck,
          selections,
          config.defaultVariants,
          conditionName,
        )
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
