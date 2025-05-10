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
