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
) => {
  for (const key of Object.keys(compoundCheck)) {
    if (compoundCheck[key] !== (selections[key] ?? defaultVariants[key])) {
      return false;
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
        const selection = variantSelection;

        if (typeof selection === "object") {
          // Conditional style

          for (const conditionName in selection) {
            const value = selection[conditionName];

            if (value != null) {
              const selectionClassName =
                config.conditionVariants[conditionName][variantName][
                  String(value)
                ];

              if (!selectionClassName) {
                throw new Error();
              }

              if (selectionClassName) {
                className += " " + selectionClassName;
              }
            }
          }
        } else {
          const selectionClassName =
            config.variantClassNames[variantName][String(selection)];

          if (!selectionClassName) {
            throw new Error();
          }

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

    get conditionVariants() {
      return config.conditionVariants;
    },
  };

  runtimeFn.conditions = () => config.conditionNames;

  return runtimeFn;
};
