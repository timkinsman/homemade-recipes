import { ConditionNames, VariantGroups, VariantSelection } from "./types";

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

/**
 * Normalizes a variant selection by extracting the `initial` value when it's the only property.
 * Used for simplifying variant selection objects when no conditional variants are needed.
 *
 * @example
 * normalizeVariantSelection('red');  // returns 'red'
 *
 * normalizeVariantSelection({ initial: 'red', xs: 'blue' }); // returns { initial: 'red', xs: 'blue' }
 *
 * normalizeVariantSelection({ initial: 'red' });  // returns 'red'
 */
export const normalizeVariantSelection = <
  Variants extends VariantGroups,
  Conditions extends ConditionNames,
  K extends keyof Variants,
>(
  selection: VariantSelection<Variants, Conditions>[K],
) => {
  if (
    isObject(selection) &&
    Object.keys(selection).length === 1 &&
    "initial" in selection
  ) {
    return selection.initial;
  }

  return selection;
};

// https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shallowEqual<T extends Record<string, any>>(
  object1: T,
  object2: T,
) {
  const keys1 = Object.keys(object1) as (keyof T)[];
  const keys2 = Object.keys(object2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
