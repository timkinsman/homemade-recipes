import { omit } from "./omit";
import { pick } from "./pick";

/**
 * TODO
 * @param obj
 * @param keys
 * @returns [variants, props]
 */
export function extractVariantsFromProps<T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): [Pick<T, K>, Omit<T, K>] {
  const variants = pick(obj, ...keys);
  const rest = omit(obj, ...keys);

  return [variants, rest];
}
