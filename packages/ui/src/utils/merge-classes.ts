export function mergeClasses(...classes: (string | undefined)[]): string {
  return classes.filter((cls): cls is string => Boolean(cls)).join(" ");
}
