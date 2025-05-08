import {
  ConditionNames,
  ResponsiveVariantSelection,
  VariantGroups,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapValues<Input extends Record<string, any>, OutputValue>(
  input: Input,
  fn: (value: Input[keyof Input], key: keyof Input) => OutputValue,
): Record<keyof Input, OutputValue> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};

  for (const key in input) {
    result[key] = fn(input[key], key);
  }

  return result;
}

export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

export function isEmptyObject(value: unknown) {
  return isObject(value) && Object.keys(value).length === 0;
}

/** Returns `true` if `selection` is `{} | { initial: {} | null | undefined } | null | undefined` */
export function isEmptyVariantSelection<
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
  K extends keyof Variants,
>(selection: ResponsiveVariantSelection<Variants, Conditions>[K]) {
  if (isObject(selection)) {
    if (Object.keys(selection).length === 0) {
      return true;
    }

    if (Object.keys(selection).length === 1) {
      if ("initial" in selection) {
        return (
          isEmptyObject(selection.initial) ||
          selection.initial === null ||
          selection.initial === undefined
        );
      }
    }
  }

  return selection === null || selection === undefined;
}
